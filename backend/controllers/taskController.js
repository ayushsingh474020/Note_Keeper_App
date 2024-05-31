const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const fetchTasks = asyncHandler(async (req,res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        if (tasks.length === 0) {
            console.log('No tasks found for this user.');
        } else {
            // console.log('Data types of dueDate field:');
            // tasks.forEach(task => {
            //     console.log(typeof task.dueDate);
            // });

            res.status(200).json(tasks)
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const fetchParticularTask = asyncHandler(async (req,res) => {
    const id=req.params.id
    try {
        const task = await Task.findOne({_id:id});
        res.status(200).json(task);
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const createNewTask = asyncHandler(async (req,res)=>{
    const {title,content,dueDate} = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const taskExists = await Task.findOne({title:title});
    if(taskExists){
        res.status(400);
        throw new Error("Task title already exists")
    }

    try {
        const task = await Task.create({
            title,content,dueDate,user:req.user._id
        })
        if(task){
            res.status(200);
            res.json({
                _id:task._id,
                title:task.title,
                content:task.content,
                dueDate:task.dueDate
            });
    
        }
        else{
            res.status(400);
            throw new Error("Failer to create task");
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const editTask = asyncHandler(async (req,res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask)

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const deleteTask = asyncHandler(async (req,res) => {
    try {
        const taskId = req.params.id; // Assuming the note ID is passed as a URL parameter

        // Use Mongoose to find the note by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return a success message as a response
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        // console.error('Error deleting note:', error);
        res.status(500).json({ message: error });
    }
})

const getTasks = asyncHandler(async (req, res) => {
    console.log(req.query);
    // console.log(req.user._id)
    try {
        const keyword = req.query.search ? {
            $or: [
                { title: { $regex: req.query.search, $options: "i" } },
                { content: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};
        const tasks = await Task.find(keyword).find({user:{$eq:req.user._id}});
        console.log(tasks)
        res.send(tasks);
    } catch (error) {
        console.log("error")
        res.status(400);
        throw new Error(error)
    }
    
});

module.exports = {fetchTasks,fetchParticularTask,editTask,deleteTask,createNewTask,getTasks}
