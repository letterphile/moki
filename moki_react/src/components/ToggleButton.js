import { useState,useEffect } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios'

export default function ToggleButton(props) {
    
  const [enabled, setEnabled] = useState(props.enableState)

  function handleChange (){
    setEnabled(!enabled)
    let incrementValue = enabled ? -1 : 1
    const time = props.task.time
    const dateTime  = new Date(time)
    const time_difference = ((Date.now() - dateTime.getTime())/1000/60/60).toFixed(2)

    let ltd_hours = (props.task.task.least_time_division/60).toFixed(2)
    ltd_hours = enabled ? ltd_hours*(-1):ltd_hours
    const taskUrl  = `${process.env.REACT_APP_API_ADDRESS}/task/status`
    const fixedTaskUrl = `${process.env.REACT_APP_API_ADDRESS}/fixed_task/status`
    const taskFilter = {
        "name":props.task.task.name,
        "time":props.task.time,
        "duration":time_difference
    }
    const fixedTaskFilter = {
        "task.name":props.task.task.name,
        "name":props.task.task.name,
        "time":props.task.time,
        "duration":time_difference
    }
    const fixedTaskUpdate = {
        "$inc":{"task.session_done": incrementValue}
    }
    console.log("time_difference",time_difference)
    const taskUpdate = {
        "$inc":{session_done:incrementValue,hours_done:time_difference,hours_left:time_difference*(-1)}
    }
    console.log("toggle button props",props)

    const url  = props.task.task.fixed ? fixedTaskUrl : taskUrl
    const filter = props.task.task.fixed ? fixedTaskFilter: taskFilter
    const update  = props.task.task.fixed ? fixedTaskUpdate: taskUpdate

    
    axios.post(url,{
        "filter": filter,
        "update": update
    }).then((response)=>{
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })

  
 
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-600' : 'bg-gray-700'
      } relative inline-flex items-center h-5 rounded-full w-10`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block w-3.5 h-3.5 transform bg-green-100 rounded-full ease-in-out duration-200`}
      />
    </Switch>
  )
}