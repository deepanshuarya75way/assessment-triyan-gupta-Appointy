import mongoose from "mongoose";
const actionSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    default:""
  },
  dueType:{
    type:String,
    enum:["date","range"],
    required:true,
  },
  dueAt:{
    type:Date,
    default:null
  },
  dueTo:{
    type:Date,
    default:null
  },
  status:{
    type:String,
    enum:["pending","completed"],
    default:"pending",
  },
  completedAt:{
    type:Date,
    default:null
  },
  appointmentNeeded:{
    type:Boolean,
    default:false,
  },
  suggestedDoctorId:{
    type:String,
    default:null
  },
  helpRequested:{
    type:Boolean,
    default:false,
  },
  helpRequestedAt:{
    type:Date,
    default:null,
  }
});

const versionSchema=new mongoose.Schema({
  version:{
    type:Number,
    required:true
  },
  guidence:{
    type:String,
    default:""
  },
  action:{
    type:[actionSchema],
    default:[]
  },
  createdBy:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

});
const followUpPlanSchema=new mongoose.Schema({
  appointmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"appointment",
    required:true,
    unique:true
  },
  patientId:{
    type:String,
    required:true
  },
  doctorId:{
    type:String,
    required:true,
  },
  currentVersion:{
    type:Number,
    default:1
  },
  versions:{
    type:[versionSchema],
    default:[]
  }

},
{
  timestamps:true
});
const followUpPlanModel=mongoose.models.followUpPlan || 
  mongoose.model("followUpPlan",followUpPlanSchema);

  export default followUpPlanModel;