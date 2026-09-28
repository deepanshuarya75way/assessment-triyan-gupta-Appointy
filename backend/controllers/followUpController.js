import followUpPlanModel from "../models/followUpPlanModels.js";
import appointmentModel from "../models/appointmentModel.js";
// import { version } from "react";

const createFollowUpPlan=async(requestAnimationFrame,res)=>{
  try{
    const doctorId=req.user.id;
    const {
      appointmentId,
      guidance,
      actions
    }=req.body;
    if(!appointmentId || !Array.isArray(actions)){
      return res.status(400).json({
        success:false,
        message:"Appointment and actions are required"
      });
    }
    const appointment=await appointmentModel.findById(appointmentId);
    if(!appointment){
      return res.status(400).json({
        success:false,
        message:"Appointment not found"
      });

    }
    if(appointment.docId.toString() !== doctorId.toString()){
      return res.status(400).json({
        success:false,
        message:"Follow-up Plan can be created after appointment completion"
      });
    }
    const existingPlan=await followUpPlanModel.findOne({
      appointmentId
    });
    if(existingPlan){
      return res.status(400).json({
        success:false,
        message:"Follow-up Plan already exists"
    });
  }
  for(const action of actions){
    if(action.dueType== "date" && !action.dueAt){
      return res.status(400).json({
        success:false,
        message:"Due date is required"
      });
    }
    if(
      action.dueType==="range" && (
        !action.dueFrom || !action.dueTo
      )
    ){
      return res.status(400).json({
        success:false,
        message:"Due range is required"
      });
    }
  }
  const plan =new followUpPlanModel({
    appointmentId,
    patientId:appointment.userId,
    doctorId,
    currentVersion:1,
    versions:[{

      version:1,
      guidance:guidance|| "",
      actions,
      createdBy:doctorId
    }
    ]
  });
  await plan.save();
  res.status(201).json({
    success:true,
    message:"Follow-up plan created",
    plan
  });
}
catch(error){
  console.error(error);
  res.status(500).json({
    success:false,
    message:error.message
  });
}
};

const getPatientFollowUpPlans=async(req,res)=>{
  try{
    const patientId=req.body.userId;
    const plans=await followUpPlanModel.find({
      patientId
    }).sort({updatedAt:-1});

    const currentPlans=plans.map(plan=>{
      const currentVersion=plan.version.find(
        version=> version.version===plan.currentVersion
      );
      return {
        _id:plan._id,
        appointmentId:plan.appointmentId,
        doctorId:plan.doctorId,
        currentVersion:plan.currentVersion,
        guidance:currentVersion?.guidance || "",
        actions:currentVersion?.actions||[],
        updatedAt:plan.updatedAt
      };
    });
    res.json({
      success:true,
      plans:currentPlans
    });

  }
  catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const getDoctorFollowUpPlan=async(req,res)=>{
  try{
    const doctorId=req.user.id;
    const {appointmentId}=req.params;
    const appointment=await appointmentModel.findById(appointmentId);
    if(!appointment){
      return res.status(404).json({
        success:false,
        message:"appointment not found"
      });
    }
    if(appointment.docId.toString()!==doctorId.toString()){
      return req.status(403).json({
        success:false,
        message:"Unauthorized appointment"
      });
    }
    const plan=await followUpPlanModel.findOne({
      appointmentId
    });
    res.json({
      success:true,
      plan
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const updateFollowUpPlan=async(req,res)=>{
  try{
    const doctorId=req.user.id;
    const {planId}=req.params;
    const {guidance ,actions}=req.body;
    const plan=await followUpPlanModel.findById(planId);
    if(!plan){
      return res.status(404).json({
        success:false,
        message:"Follow-up plan not found"
      });
    }
    if(plan.doctorId.toString()!==doctorId.toString()){
      return res.status(403).json({
        success:false,
        message:"unauthorized action"
      });
    }
    const newVersion=plan.currentVersion+1;
    plan.version.push({
      version:newVersion,
      guidance:guidance||"",
      actions,
      createdBy:doctorId
    });
    plan.currentVersion=newVersion;
    await plan.save();
    res.json({
      success:true,
      message:"Follow-up plan updated",
      plan
    });

  }catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const completeFollowUpAction=async(req,res)=>{
  try{
    const patientId=req.body.userId;
    const {planId,actionId}=req.boby;
    const plan =await followUpPlanModel.findOne({
      _id:planId,
      patientId
    });
    if(!plan){
      return res.status(404).json({
        success:false,
        message:"Follow-up plan not found"
      });
    }
    const currentVersion=plan.versions.find(
      version=>version.version===plan.currentVersion
    );
    if(!currentVersion){
      return res.status(404).json({
        success:false,
        message:"current paln version not found"
      });
    }
    const action = currentVersion.actions.id(actionId);
    if(!action){
      return res.status(404).json({
        success:false,
        message:"Action not found"
      });
    }
    action.status="completed";
    action.completedAt=new Date();
    await plan.save();
    res.json({
      success:true,
      message:"Follow-up action completed"
    });
  }catch(error){
    console.error(error);
  }

};

const requestFollowUpHelp=async(req,res)=>{
  try{
    const patientId=req.body.userId;
    const {planId,actionId} =req.body;
    const plan =await followUpPlanModel.findOne({
      _id:planId,
      patientId
    });
    if(!plan){
      return res.status(404).json({
        success:false,
        message:"follow-up plan not found"
      });
    }
    const currentVersion=plan.versions.find(
      version=>version.version===plan.currentVersion
    );
    const action= currentVersion.action.id(actionId);
    if(!action){
      return res.status(404).json({
        success:false,
        message:"Action not found"
      });
    }
    action.helpRequested=true;
    action.helpRequestedAt=new Date();
    await plan.save();
    res.json({
      success:true,
      message:"help request sent to staff"
    });

  }catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

export{
  createFollowUpPlan,
  getDoctorFollowUpPlan,
  getPatientFollowUpPlans,
  updateFollowUpPlan,
  completeFollowUpAction,
  requestFollowUpHelp
};