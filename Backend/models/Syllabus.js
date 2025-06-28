const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  subject: String,
  deadline: Date,
  topics: [{ title: String, completed: Boolean }],
});

module.exports = mongoose.model("Syllabus", syllabusSchema);