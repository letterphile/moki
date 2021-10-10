import { useState,useEffect } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios'

export default function ToggleButton2(props) {
  console.log("props in Button",props.isFreeze)
  let [freeze, setFreeze] = useState(props.isFreeze)
  console.log(freeze)
  function handleChange (){
    setFreeze(!freeze)

    const taskUrl  = `${process.env.REACT_APP_API_ADDRESS}/task/status`

    const taskFilter = {
        "name":props.task.task.name
    }
    
    
    const taskUpdate = {
        "$set":{"freeze":!freeze}
    }
    console.log("toggle button props",props)

    const url  = taskUrl
    const filter = taskFilter
    const update  = taskUpdate

    
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
      checked={freeze}
      onChange={handleChange}
      className={`${
        freeze ? 'bg-green-600' : 'bg-gray-700'
      } relative inline-flex items-center h-5 rounded-full w-10`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          freeze ? 'translate-x-5' : 'translate-x-1'
        } inline-block w-3.5 h-3.5 transform bg-green-100 rounded-full ease-in-out duration-200`}
      />
    </Switch>
  )
}