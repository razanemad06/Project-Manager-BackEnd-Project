const express=require("express");
const fs=require("fs");
const Project = require("../models/Project");

const projectRouter=express.Router();

projectRouter.get("/",(req,res)=>
{
    Project.find().then(projects=>
    {
        res.json({
            status:"success",
            results:projects.length,
            data:projects
        })
    }
    ).catch(err=>{
        res.json({
            status:"error",
            message:err.message
        })
    });
}
);

projectRouter.get("/:id",(req,res)=>{
    const projectId = req.params.id;
    Project.findById(projectId).then(project=>{
        if(project)
        {
            res.status(200).json({
            status:"success",
            data:{project}
        })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"project not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })
    })
}
);

projectRouter.post("/",(req,res)=>
{
    const newProject=req.body;
    Project.create(newProject).then(newProject=>{
        res.status(201).json({
            status:"success",
            data:{newProject}
        })
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })
    })
});

projectRouter.patch("/:id",(req,res)=>{
    const projId=req.params.id;
    const updatedProject=req.body;
    Project.findByIdAndUpdate(projId,updatedProject,{new:true}).then(updatedProject=>{
        if(updatedProject)
        {
            res.status(200).json({
                status:"success",
                data:{updatedProject}
            })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"project not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })
    })
});

projectRouter.delete("/:id",(req,res)=>
{
    const projId=req.params.id;
    Project.findByIdAndDelete(projId).then(proj=>{
        if(proj)
        {
            res.json({
            status:"success",
            data:{proj:null},
        })
        }
        else
        {
            res.status(404).json({
                status:"fail",
                message:"project not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            status:"error",
            message:err.message
        })

    })
});

projectRouter.post("/:id/members",(req,res)=>{
    const projId=req.params.id;
    const newMember=req.body.name;
    
});

projectRouter.delete("/:id/members",(req,res)=>{
    const projectId = req.params.id;
    const memberToRemove = req.body.name;
    fs.readFile("./data/projects.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading projects data");
        } else {
            const projects = JSON.parse(data);
            const projectIndex = projects.findIndex(p => p.id == projectId);
            if (projectIndex !== -1) {
                const memberIndex = projects[projectIndex].members.findIndex(m => m === memberToRemove);
                if (memberIndex !== -1) {
                    projects[projectIndex].members.splice(memberIndex, 1);
                    fs.writeFile("./data/projects.json", JSON.stringify(projects, null, 2), (err) => {
                        if (err) {
                            res.status(500).send("Error writing projects data");
                        } else {
                            res.status(200).send("Member removed successfully");
                        }
                    });
                } else {
                    res.status(404).send("Member not found in project");
                }
            } else {
                res.status(404).send("Project not found");
            }
        }
    });
});

module.exports=projectRouter;