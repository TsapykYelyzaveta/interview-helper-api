const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController.js");


router.post("/add", QuestionController.addQuestion);
router.patch("/edit", QuestionController.editQuestion);
router.put("/edit", QuestionController.replaceQuestion);
router.get("/", QuestionController.getQuestions);
router.get("/:id", QuestionController.getQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

module.exports = router;
