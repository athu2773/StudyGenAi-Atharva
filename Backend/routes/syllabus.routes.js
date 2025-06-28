const express = require("express");
const router = express.Router();
const auth = require("../utils/auth.middleware");
const { createSyllabus, getSyllabus, deleteSyllabus } = require("../controllers/syllabus.controller");

router.post("/", auth, createSyllabus);
router.get("/", auth, getSyllabus);
router.delete("/:id", auth, deleteSyllabus);

module.exports = router;