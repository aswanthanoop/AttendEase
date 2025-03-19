const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Task
router.post("/", authMiddleware, async (req, res) => {
  const newTask = new Task({ userId: req.user.userId, task: req.body.task });
  await newTask.save();
  res.json({ message: "Task Added!" });
});

// Get Tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

module.exports = router;
