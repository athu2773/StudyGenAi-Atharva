const { generateContent } = require("../utils/googleai");

// Simple input sanitization to prevent prompt injection
function sanitizeInput(input) {
  if (typeof input === "string") {
    return input.replace(/[\n\r\t]/g, " ").trim();
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  return input;
}

function validateFields(fields, req, res) {
  for (const field of fields) {
    if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
      res.status(400).json({ error: `Missing or invalid field: ${field}` });
      return false;
    }
  }
  return true;
}

exports.generateStudyPlan = async (req, res) => {
  if (!validateFields(["subject", "topics", "deadline"], req, res)) return;
  if (!Array.isArray(req.body.topics)) {
    return res.status(400).json({ error: "'topics' must be an array" });
  }
  const subject = sanitizeInput(req.body.subject);
  const topics = sanitizeInput(req.body.topics);
  const deadline = sanitizeInput(req.body.deadline);
  const prompt = `Create a daily study plan for ${subject} with topics: ${topics.join(", ")}. Deadline: ${deadline}. Assume user studies 2 hrs/day.`;

  try {
    const plan = await generateContent(prompt);
    res.json({ plan });
  } catch (err) {
    console.error("AI generateStudyPlan error:", err);
    res.status(500).json({ error: "AI failed to generate plan" });
  }
};

exports.generateFlashcards = async (req, res) => {
  if (!validateFields(["subject", "topic"], req, res)) return;
  const subject = sanitizeInput(req.body.subject);
  const topic = sanitizeInput(req.body.topic);
  const prompt = `Create 5 flashcards (question and short answer) for the topic \"${topic}\" in subject \"${subject}\".`;

  try {
    const flashcards = await generateContent(prompt);
    res.json({ flashcards });
  } catch (err) {
    console.error("AI generateFlashcards error:", err);
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
};

exports.generateQuiz = async (req, res) => {
  if (!validateFields(["subject", "topic"], req, res)) return;
  const subject = sanitizeInput(req.body.subject);
  const topic = sanitizeInput(req.body.topic);
  const prompt = `Generate 5 multiple choice questions with 4 options each (label A-D) and mark the correct answer for topic \"${topic}\" in \"${subject}\".`;

  try {
    const quiz = await generateContent(prompt);
    res.json({ quiz });
  } catch (err) {
    console.error("AI generateQuiz error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

