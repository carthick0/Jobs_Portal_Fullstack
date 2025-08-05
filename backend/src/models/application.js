const mongoose=require('mongoose');

const applicationSchema=new mongoose.Schema({
   jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', 
    required: true
  },
    name:String,
    email:String,
    resumeUrl:String
})

const Application=mongoose.model('Application',applicationSchema);
module.exports=Application;