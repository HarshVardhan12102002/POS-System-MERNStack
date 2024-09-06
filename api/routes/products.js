const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      messages: "Products listed successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({
      status: "success",
      messages: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.put("/update-product", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.body.productId },
      req.body
    );
    if (!product) {
      res.status(404).json({
        status: "error",
        messages: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.delete("/delete-product", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.body.productId,
    });
    if(!product){
      res.status(404).json({
        status: "error",
        messages: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      messages: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
