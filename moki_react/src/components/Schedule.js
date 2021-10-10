import axios from 'axios'
import React, { useEffect, useState } from 'react';
import ToggleButton from './ToggleButton'
function Schedule(props){
    const currentTime = Date.now()
    const [schedule,setSchedule] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ADDRESS}/schedule/get`)
        .then(
            (response=>{
                setSchedule(response.data.info)
            })
        ).catch((e)=>{
            console.log(e)
        })
    },[])
    
    console.log("schedule is ",schedule)
    props.changePage("schedule")
    return(
        <div className="grid place-items-center pt-20">

        <table className="table-fixed max-w-4xl  bg-green-100 shadow-lg rounded-lg">
  <thead>
    <tr>
      <th className="w-1/2 ...">Time</th>
      
      <th className="w-1/4 ...">Task</th>
      <th className="w-1/4 ...">Duration</th>
      <th className="w-1/4 ...">Status</th>
    </tr>
  </thead>
  <tbody>
    {
        
        schedule.map((s)=>{
          const enableState = s.task.fixed && s.task.session_done ? true : false
        return (
            <tr>
      <td className="text-left ">{new Date(s.time).toUTCString()}</td>
      <td className="text-left">{s.task.name}</td>
      <td className="text-center">{s.task.least_time_division.toFixed(0)}</td>
      {
        console.log("current Time",currentTime)
      }
      {
        console.log("Time in Data",s.time.substring(0,s.time.indexOf("+")))
      }
     
      {
   currentTime > new Date(s.time.substring(0,s.time.indexOf("+"))).getTime() ?(
      <td className="text-center"><ToggleButton task={s} enableState ={enableState} /></td>
        ):(
          <td className="text-center"></td>
        )
        }
    </tr> 
        
        )
        }
        )
    
}
  </tbody>
</table>
</div>
    )
}

export default Schedule;