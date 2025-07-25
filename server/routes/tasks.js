import express from "express";  
import Task from "../models/task.js";  

const router = express.Router(); 

router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.json(task);  // Changed from send to json
    } catch (error) {
        res.status(500).json({ error: error.message });  // Better error handling
    }
});

// Changed from "/api/tasks" to just "/"
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);  // Changed from send to json
    } catch (error) {
        res.status(500).json({ error: error.message });  // Better error handling
    }
});

router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }  // Added to return updated document
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json({ 
            message: "Task deleted successfully",
            deletedTask: task 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
