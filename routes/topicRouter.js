const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/topicController.js");


router.post("/", TopicController.addTopic);
router.patch("/", TopicController.editTopic);
router.put("/", TopicController.replaceTopic);
router.get("/", TopicController.getTopics);
router.get("/:id", TopicController.getTopic);
router.delete("/:id", TopicController.deleteTopic);

module.exports = router;
