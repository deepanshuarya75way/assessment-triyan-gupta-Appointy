import express from "express";

import{
  createFollowUpPlan,
  getDoctorFollowUpPlan,
  getPatientFollowUpPlans,
  updateFollowUpPlan,
  completeFollowUpAction,
  requestFollowUpHelp
} from "../controllers/followUpController.js";

import authUser from "../middlewares/authUser.js";
import authDoctor from "../middlewares/authDoctor.js";

const followUpRouter=express.Router();
followUpRouter.post(
  "/doctor/create",
  authDoctor,
  createFollowUpPlan
);

followUpRouter.get(
  "./patient/plans",
  authUser,
  getPatientFollowUpPlans
);
followUpRouter.get(
  "/doctor/:appointmentId",
  authDoctor,
  getDoctorFollowUpPlan
);
followUpRouter.put(
  "/doctor/:planId",
  authDoctor,
  updateFollowUpPlan
);
followUpRouter.post(
  "/patient/request-help",
  authUser,
  requestFollowUpHelp
);

export default followUpRouter;