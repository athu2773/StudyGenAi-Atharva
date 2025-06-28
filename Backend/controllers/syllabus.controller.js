const Syllabus = require("../models/Syllabus");

exports.createSyllabus = async (req, res) => {
  const { subject, deadline, topics } = req.body;
  try {
    const syllabus = await Syllabus.create({
      userId: req.userId,
      subject,
      deadline,
      topics,
    });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ error: "Failed to create syllabus" });
  }
};

exports.getSyllabus = async (req, res) => {
  const syllabus = await Syllabus.find({ userId: req.userId });
  res.json(syllabus);
};

exports.deleteSyllabus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Syllabus.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete syllabus" });
  }
};