const db = require("../config/db");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

exports.createQR = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { destination_url, qr_type, text_content } = req.body;

    console.log("qr_type:", qr_type);
    console.log("destination_url:", destination_url);

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

    console.log("qrData:", qrData);

    const redirectUrl = `${BACKEND_URL}/api/qr/${token}`;
    const qrImage = await QRCode.toDataURL(redirectUrl);

    await db.query(
      `INSERT INTO qrcodes (user_id, qr_token, qr_type, original_data, qr_image, is_dynamic, destination_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, token, qr_type, qrData, qrImage, true, qrData]
    );

    console.log("QR saved successfully, token:", token);

    res.status(201).json({
      message: "QR created successfully",
      qrImage,
      qrData,
    });

  } catch (error) {
    console.log("QR CREATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.redirectQR = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Scanning token:", token);

    const [rows] = await db.query(
      "SELECT * FROM qrcodes WHERE qr_token = ?",
      [token]
    );

    console.log("Rows found:", rows.length);

    if (rows.length === 0) {
      return res.status(404).json({ message: "QR not found" });
    }

    res.redirect(rows[0].destination_url);

  } catch (error) {
    console.log("REDIRECT ERROR:", error.message);
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