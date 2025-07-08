const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const syncToSheets = require("./syncToSheets");

// Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single submission
router.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a submission
router.post("/", async (req, res) => {


  const { name, email, message, status } = req.body;

  const newSubmission = new Submission({
    name,
    email,
    message,
    status,
  });

  try {
    const saved = await newSubmission.save();

    // 👉 Trigger Google Sheets sync after saving
    await syncToSheets();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(400).json({ message: err.message });
  }
});

// Update a submission
router.patch("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    if (req.body.status) submission.status = req.body.status;

    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a submission
router.delete("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Submission deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
