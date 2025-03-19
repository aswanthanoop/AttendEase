const express = require("express");
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Mark Attendance
router.post("/", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const newAttendance = new Attendance({ userId: req.user.userId, status });
  await newAttendance.save();
  res.json({ message: "Attendance Marked!" });
});

// Get Attendance History
router.get("/", authMiddleware, async (req, res) => {
  const attendance = await Attendance.find({ userId: req.user.userId });
  res.json(attendance);
});

module.exports = router;

