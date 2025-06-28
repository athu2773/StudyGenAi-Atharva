const express = require("express");
const router = express.Router();
const auth = require("../utils/auth.middleware");
const { generateStudyPlan, generateFlashcards, generateQuiz } = require("../controllers/ai.controller");

router.post("/plan", auth, generateStudyPlan);
router.post("/flashcards", auth, generateFlashcards);
router.post("/quiz", auth, generateQuiz);

module.exports = router;
