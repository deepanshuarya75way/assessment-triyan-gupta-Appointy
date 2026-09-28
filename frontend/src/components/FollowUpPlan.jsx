import React, { useEffect, useState } from "react";
 import axios from "axios";

 const FollowUpPlan=({
  backendUrl,
  token,
  navigate
 })
 const [plans,setPlans]=useState([]);
 const loadPlans=async()=>{
  const {data}=await axios.get(
    backendUrl+"/api/follow-up/patient/plans",
    {headers:{token}}
  );
  if(data.success) setPlans(data.plans);
 };
 useEffect(()=>{
  loadPlans();
 },[]);

 const complete=async(planId,actionId)=>{
  await axios.post(
    backendUrl+"/api/follow-up/patient/complete-action",
    {planId,actionId},
    {headers:{token}}
  );
  loadPlans();
 };
 const help=async (planId,actionId)=>{
  await axios.post (
    backendUrl+"/api/follow-up/patient/request-help",
    {planId,actionId},
    {headers:{token}}
  );
  loadPlans();
};
  const overDue=(a)=>{
    a.status!=="completed" && new Date(a.dueType==="date"? a.dueAt:a.dueTo)<new Date();
      
    return (
      <div className="mt-6">
        <h2 className="text-xl"> follow up plan</h2>
        {plans.map(plan=>(
          <div key={plan._id}>
            <p><b>Guidance:</b>{plan.guidance}</p>
            {plan.actions.map(a=>(
              <div key={a._id}>
                <b>{a.title}</b>
                <p>{a.description}</p>
                <p>
                  <b>Due:</b>{" "}
                  {a.dueType==="date"?
                  new Date(a.dueAt).toLocaleDateString():`${new Date(a.dueFrom).toLocaleDateString()}-${new Date(a.dueTo).toLocaleDateString()}`}

                </p>
                {overDue(a) && (
                  <p>Overdue</p>
                )}
                {a.status==="completed"?(
                  <p>Completed</p>

                ):(
                  <>
                  <button onClick={()=> complete(plan._id,a._id)}>complete</button>
                  <button onClick={()=> help(plan._id,a._id)}>Ask For Help</button>

                  {a.appointmentNeeded && a.suggestedDoctorId && (
                    <button onClick={()=>
                      navigate(`/appointment/ $ {a.suggestedDoctorId}`

                      )
                    }
                    >
                    Book follow-up
                    </button>
                  )}

               
                  </>
                )}
                </div>
            ))}
            </div>
        ))}
      </div>
  );
  };

  export default FollowUpPlan;
 
 