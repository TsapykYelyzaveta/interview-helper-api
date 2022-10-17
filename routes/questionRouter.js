const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController.js");


router.post("/", QuestionController.addQuestion);
router.patch("/", QuestionController.editQuestion);
router.put("/", QuestionController.replaceQuestion);
router.get("/", QuestionController.getQuestions);
router.get("/:id", QuestionController.getQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

module.exports = router;
