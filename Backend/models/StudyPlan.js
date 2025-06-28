const mongoose = require("mongoose");

const StudyPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  deadline: { type: String },
  topics: [{ type: String }],
  plan: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudyPlan", StudyPlanSchema);
