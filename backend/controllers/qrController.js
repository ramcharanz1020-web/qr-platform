const db = require("../config/db");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

exports.createQR = async (req, res) => {
  try {
    const { destination_url, qr_type, text_content } = req.body;

    const user_id = req.user.id;
    const token = uuidv4();

    const BACKEND_URL = "https://qr-platform-backend-okqq.onrender.com";

    let qrData = "";

    if (qr_type === "url") {
      qrData = destination_url;
    } else if (qr_type === "text") {
      qrData = text_content;
    } else if (qr_type === "image" || qr_type === "document") {
      if (!req.file) {
        return res.status(400).json({ message: "File required" });
      }
      qrData = `${BACKEND_URL}/uploads/${req.file.filename}`;
    }

    const redirectUrl = `${BACKEND_URL}/api/qr/${token}`;
    const qrImage = await QRCode.toDataURL(redirectUrl);

    await db.query(
      `INSERT INTO qrcodes (user_id, qr_token, qr_type, original_data, qr_image, is_dynamic, destination_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, token, qr_type, qrData, qrImage, true, qrData]
    );

    res.status(201).json({
      message: "QR created successfully",
      qrImage,
      qrData,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.redirectQR = async (req, res) => {
  try {
    const { token } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM qrcodes WHERE qr_token = ?",
      [token]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "QR not found" });
    }

    const qr = rows[0];

    if (qr.qr_type === "text") {
      return res.send(`
        <html>
          <body style="font-family:sans-serif;padding:40px;text-align:center;">
            <h2>QR Text Content</h2>
            <p style="font-size:24px;">${qr.original_data}</p>
          </body>
        </html>
      `);
    }

    res.redirect(qr.original_data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserQRs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await db.query(
      "SELECT * FROM qrcodes WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQR = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM qrcodes WHERE id = ?", [id]);
    res.status(200).json({ message: "QR deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};