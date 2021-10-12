import axios from 'axios'
import React, { useEffect, useState } from 'react';
import ToggleButton from './ToggleButton'
function FootPrints(props){
    const currentTime = Date.now()
    const [schedule,setSchedule] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ADDRESS}/foot_prints/`)
        .then(
            (response=>{
                setSchedule(response.data.info)
            })
        ).catch((e)=>{
            console.log(e)
        })
    },[])
    
    console.log("schedule is ",schedule)
    props.changePage("footprints")
    return(
        <div className="grid place-items-center pt-20">

        <table className="table-fixed max-w-4xl  bg-green-100 shadow-lg rounded-lg">
  <thead>
    <tr>
      <th className="w-1/2 ...">Time</th>
      
      <th className="w-1/4 ...">Task</th>
      <th className="w-1/4 ...">Duration</th>
   
    </tr>
  </thead>
  <tbody>
    {
        
        schedule.map((s)=>{
     
        return (
            <tr>
      <td className="text-left ">{new Date(s.time).toString().slice(0,28)}</td>
      <td className="text-left">{s.name}</td>
      <td className="text-center">{(s.duration * 60).toFixed(0)}</td>
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

export default FootPrints;