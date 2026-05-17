const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createQR,
  redirectQR,
  getUserQRs,
  deleteQR
} = require("../controllers/qrController");

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  upload.single("file"),
  createQR
);

router.get(
  "/myqrs",
  authMiddleware,
  getUserQRs
);

router.delete(
  "/:id",
  authMiddleware,
  deleteQR
);

router.get("/:token", redirectQR);

module.exports = router;