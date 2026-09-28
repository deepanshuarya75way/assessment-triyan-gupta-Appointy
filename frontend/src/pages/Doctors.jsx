import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const FollowUpPlan=({backendUrl,token,appointmentId})=>{
  const [guidance,setGuidance]=useState("");
  const [actions,setActions]=useState([{
    title:"",
    description:"",
    dueType:"Date",
    dueAt:"",
    dueFrom:"",
    dueTo:"",
    appointmentNeeded:false

  }
  ]);
  const addAction=()=>{
    setActions([
      ...actions,
      {
        title:"",
        description:"",
         dueType:"Date",
    dueAt:"",
    dueFrom:"",
    dueTo:"",
    appointmentNeeded:false
      }
    ])
  };
  const updateAction=(i,field,value)=>{
    const copy=[...actions];
    copy[i][field]=value;
    setActions(copy);
  };
  const createPlan=async()=>{
    const {data}=await axios.post(
      backendUrl+"/api/follow-up/doctor/create",
      {appointmentId, guidance , actions},{
        headers:{token}
      }
    );
    alter(data.message);
  }
}

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Create follow up plan</h2>
        <textarea
        placeholder='Follow-up guidance'
        value={guidance}
        onChange={e=>setGuidance(e.target.value)}/>
        {actions.map((a,i)=>(
          <div key={i}>
            <input
            placeholder='="Action title'
            value={a.title}
            onChange={e=> updateAction(i,"title",e.target.value)

            }
            />
            <input
             placeholder='="description'
            value={a.description}
            onChange={e=> updateAction(i,"description",e.target.value)
            }
            />
            <select
            value={a.dueType}
            onChange={e=>updateAction(i,"dueType",e.target.value)

            }>
              <option value='date'>specific Date</option>
              <option value="range">Date Range</option>
              </select>
              {a.dueType==="date"?(
                <input type="date"
                value={a.dueAt}
                onChange={e=>updatedAction(i,"dueAt",e.target.value)}/>
              ):(
                <>
                <input type="date"
                value={a.dueFrom}
                onChange={e=>updatedAction(i,"dueFrom",e.target.value)}/>
                <input type="date"
                value={a.dueTo}
                onChange={e=>updatedAction(i,"dueTo",e.target.value)}/>
                
                
                </>
              
              )}
              <label>
                <input type="checkbox"
                checked={a.appointmentNeeded}
                onChange={e=> updateAction(i,"appointmentNeeded",e.target.checked

                )}/>
              </label>
              </div>
        ))}
        <button onClick={addAction}>Add Action</button>
        <button onClick={createPlan}>create plan</button>
      </div>
    </div>
  )
}

export default Doctors
