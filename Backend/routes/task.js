const express = require("express");
const addTask = require("../models/addTask");

const router = express.Router();

router.post("/new", async (req, res) => {
  const { email, title, date, description } = req.body;

  const titleExist = await addTask.findOne({ title });

  if (titleExist || titleExist?.email === email) {
    res.status(400).send("Please use different title for different task");
  } else {
    try {
      const newTask = new addTask({
        email,
        title,
        date,
        description,
        status: "pending",
      });

      const createTask = await newTask.save();

      res.status(200).json(createTask);
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/edit", async (req, res) => {
  const { id,title, date, description } = req.body;
    try {
      const editedTask = await addTask.findByIdAndUpdate(
         id ,
        { title, date, description }
      );
      res.status(200).json(editedTask);
    } catch (error) {
      console.log(error);
    }
  }
);

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const deletedTask = await addTask.findByIdAndDelete( id );

    res.json(deletedTask);
  } catch (error) {
    console.log(error);
  }
});

router.post("/pending", async (req, res) => {
  const { email } = req.body;

  try {
    const pendingTasks = await addTask.find({ email, status: "pending" });

    res.json(pendingTasks);
  } catch (error) {
    console.log(error);
  }
});

router.put("/status", async (req, res) => {
  const { id } = req.body;

  try {
      const status = await addTask.findByIdAndUpdate(id,{status : "completed"});
      res.json(status);
  } catch (error) {
    console.log(error);
  }
});

router.post("/completed", async (req, res) => {
  const { email } = req.body;

  try {
    const completed = await addTask.find({ email, status: "completed" });

    res.json(completed);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
