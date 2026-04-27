//require modules
const mongoose=require("mongoose");

//build schema 
const taskSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter a title"]
    },
    description:{
        type:String,
        minlength: [5,"please enter at least 5 characters"]
    },
    status:{
        type:String,
        enum:["Pending","In Progress","Done"],
        message:["please choose between (Pending, In Progress, Done)"],
        default:"Pending"
    }
},{
    timestamps:true
})

//build model
const Task=mongoose.model('Task',taskSchema);

//export model
module.exports=Task;