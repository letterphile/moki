import axios from 'axios'
import React, { useEffect, useState } from 'react';
import ToggleButton2 from './ToggleButton2'
import DropDown  from "./DropDown";
function Tasks(props){
    const [tasks,setTasks] = useState([])
    const [frozenTasks,setFrozenTasks] = useState([])
    const [frozenFlag,setFrozenFlask] = useState(false)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ADDRESS}/schedule/task`)
        .then(
            (response=>{
                setTasks(response.data.info)
                setFrozenTasks(response.data.frozenTasks)
                
            })
        ).catch((e)=>{
            console.log(e)
        })
    },[])
    
    console.log("tasks",tasks)
    console.log("frozenTasks",frozenTasks)
    props.changePage("tasks")
    return(
        <div className="relative">
        
        <div className="pt-12 grid place-items-center ">

        <table className="table-fixed max-w-4xl  bg-green-100 shadow-lg rounded-lg">
  <thead>
    <tr>
      <th className="w-1/4 ...">Task</th>
      <th className="w-1/4 ...">Total Time Required</th>
      <th className="w-1/4 ...">Completion Projection</th>
      <th className="w-1/4 ...">Froze</th>
    </tr>
  </thead>
  <tbody>

    {
        !frozenFlag ? (
            
            tasks.map((s,i)=>{
                console.log("unfrozen",s.task)
      
            return (
                <tr key={i}>
          {/* <td className="text-left ">{new Date(s.time).toUTCString()}</td> */}
          <td className="text-left">{s.task.name}</td>
          <td className="text-center">{s.task.expected_time_complete+" hours"}</td>
          <td className="text-center">{new Date(s.time).toString().slice(0,28)}</td>
          <td className="text-center"><ToggleButton2 task={s} isFreeze ={s.task.freeze} /></td>
        </tr> 
            
            )
            }
            )
        ):(
            
            frozenTasks.map((s)=>{
                console.log("frozenTask",s)
      
            return (
                <tr>
          {/* <td className="text-left ">{new Date(s.time).toUTCString()}</td> */}
          <td className="text-left">{s.name}</td>
          <td className="text-center">{s.etc+" hours"}</td>
          <td className="text-center"></td>
          <td className="text-center"><ToggleButton2 task={{task:s}} isFreeze ={s.freeze} /></td>
        </tr> 
            
            )
            }
            )
        )       
    
}

{
        

        

        
    
}
  </tbody>
</table>
</div>
<DropDown function={setFrozenFlask}/>
</div>
    )
}

export default Tasks;