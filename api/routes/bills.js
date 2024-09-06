const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
    // res.status(200).json({
    //   status: "success",
    //   messages: "Bills listed successfully",
    //   data: bills,
    // });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json({
      status: "success",
      messages: "Bill added successfully",
      data: newBill,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
