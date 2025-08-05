const mongoose =require("mongoose");

const jobSchema=new mongoose.Schema({
    title:String,
    company:String,
    location:String,
    description:String
})
const Job=mongoose.model("Job",jobSchema)
module.exports=Job;