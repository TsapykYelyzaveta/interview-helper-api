const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/topicController.js");


router.post("/add", TopicController.addTopic);
router.patch("/edit", TopicController.editTopic);
router.put("/edit", TopicController.replaceTopic);
router.get("/", TopicController.getTopics);
router.get("/:id", TopicController.getTopic);
router.delete("/:id", TopicController.deleteTopic);

module.exports = router;
