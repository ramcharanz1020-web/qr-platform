const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

app.use(cors({
  origin: "*",
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