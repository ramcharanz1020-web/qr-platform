const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://qr-platform-swart.vercel.app",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("QR Platform API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/qr", qrRoutes);

module.exports = app;
