//1. require modules
const mongoose=require("mongoose");

//2. build schema 
const projectSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"You have to enter the title"],
        trim:true,
        minlength:[3,"You should write at least 3 characters"]
    },
    description:{
        type:String,
        trim:true,
        default:"This is a description"
    },
    status:{
        type:String,
        enum:["Active","Completed","Archived"],
        message:"You have to choose between (Active, Completed, Archive)",
        default:"Active"
    },
},{
    timestamps:true
});

//3.build model
const Project=mongoose.model('Project',projectSchema);

//4.export model
module.exports=Project;