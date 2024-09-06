const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      status: "success",
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // create category

router.get("/get-categories", async (req, res) => {
  try {
    const categories = await Category.find();
    // res.send(categories)
    res.status(200).json({
      status: "success",
      message: "Categories listed successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // get all categories

router.put("/update-category", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.body.categoryId },
      req.body
    );
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // update category

router.delete("/delete-category", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.body.categoryId,
    });
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // delete category

module.exports = router;
