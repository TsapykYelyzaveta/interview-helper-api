const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController.js");


router.post("/add", CategoryController.addCategory);
router.patch("/edit", CategoryController.editCategory);
router.put("/edit", CategoryController.replaceCategory);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
