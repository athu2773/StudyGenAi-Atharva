const StudyPlan = require("../models/StudyPlan");

exports.createStudyPlan = async (req, res) => {
  try {
    const { subject, deadline, topics, plan } = req.body;
    const user = req.userId; // Fix: use req.userId set by auth middleware
    const studyPlan = await StudyPlan.create({ user, subject, deadline, topics, plan });
    res.status(201).json(studyPlan);
  } catch (err) {
    res.status(500).json({ error: "Failed to create study plan" });
  }
};

exports.getStudyPlans = async (req, res) => {
  try {
    const user = req.userId; // Fix: use req.userId
    const plans = await StudyPlan.find({ user });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch study plans" });
  }
};

exports.updateStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.body;
    const user = req.userId; // Fix: use req.userId
    const updated = await StudyPlan.findOneAndUpdate(
      { _id: id, user },
      { plan },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update study plan" });
  }
};

exports.deleteStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.userId; // Fix: use req.userId
    const deleted = await StudyPlan.findOneAndDelete({ _id: id, user });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete study plan" });
  }
};
