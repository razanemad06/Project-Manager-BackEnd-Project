const express=require("express");
const ProjectRouter = require("./Routes/projectRouter");
const TaskRouter=require("./Routes/taskRouter");

const mongoose = require("mongoose");

const app=express();

//db connection
const dns = require("dns");
 // force Node to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectUrl="mongodb+srv://user:123@cluster0.l9tb4kt.mongodb.net/Multi_Task_Manager?appName=Cluster0";
mongoose.connect(connectUrl).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json());

app.use("/projects",ProjectRouter);

app.use("/tasks",TaskRouter);

app.use((req,res)=>{
    res.status(404).send("Not Found");
})


app.listen(3000,()=>console.log("Listening on port 3000"));