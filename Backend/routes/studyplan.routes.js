const express = require("express");
const router = express.Router();
const auth = require("../utils/auth.middleware");
const {
  createStudyPlan,
  getStudyPlans,
  updateStudyPlan,
  deleteStudyPlan,
} = require("../controllers/studyplan.controller");

router.post("/", auth, createStudyPlan);
router.get("/", auth, getStudyPlans);
router.put("/:id", auth, updateStudyPlan);
router.delete("/:id", auth, deleteStudyPlan);

module.exports = router;
