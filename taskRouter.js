const express=require("express");
const fs=require("fs");
const Task= require("../models/tasks");
const Project = require("../models/Project");

const taskRouter=express.Router();

taskRouter.post("/",(req,res)=>{
    const newTask=req.body;
    Task.create(newTask).then(newTask=>{
        res.json({
            status:"success",
            data:{newTask}
        })
    }).catch(err=>{
        res.json({
            status:"error",
            message:err.message
        })
    })
});

taskRouter.get("/:id",(req,res)=>{
    const taskId=req.params.id;
    Task.findById(taskId).then(task=>{
        if(task)
        {
            res.status(200).json({
            status:"success",
            data:{task}
        })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"task not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })
    })
});

taskRouter.delete("/:id",(req,res)=>{
    const taskId=req.params.id;
    Task.findByIdAndDelete(taskId).then(task=>{
        if(task)
        {
            res.json({
            status:"success",
            data:{task:null},
        })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"task not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })

    })
});

taskRouter.patch("/:id",(req,res)=>{
    const taskId=req.params.id;
    const updatedTask=req.body;
    Task.findByIdAndUpdate(taskId,updatedTask,{new:true , runValidators: true}).then(updatedTask=>{
        if(updatedTask)
        {
            res.status(200).json({
                status:"success",
                data:{updatedTask}
            })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"task not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })
    })
});

taskRouter.get("/",(req,res)=>{
    const projId=req.query.projectId;
    Task.find().then((tasks)=>{
        res.json({
            status:"success",
            data:{tasks}
        })
    }).catch(err=>{
        res.json({
            status:"error",
            message:err.message
        })
    })
});

module.exports=taskRouter;