const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController.js");


router.post("/", CategoryController.addCategory);
router.patch("/", CategoryController.editCategory);
router.put("/", CategoryController.replaceCategory);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
