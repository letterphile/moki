
import gapProperties from 'postcss-gap-properties';
import Button from './Button'
import axios from 'axios'
import Input from './Input';
import Navigation from './Navigation';
import React, { useEffect, useState } from 'react';


function Topic(props) {
    const [taskValue, setTaskValue] = useState("");
    props.changePage("topics")
    function handleTaskValueChange (e) {
        setTaskValue(e.target.value)
      }

      function sendData(){
             
                
                axios.post(`${process.env.REACT_APP_API_ADDRESS}/fixed_task/create`,{
                
                }).then(response=>{
                  if(response.status==200){
                    console.log("setting states")
                      setTaskValue("")
                     
                  }
                }).catch(error => console.log(error))

                // axios.get("localhost:8000").then(r=>console.log(r)).catch(e=>console.log(e))
            }
            
      

  return (
    <div className="grid place-items-center pt-20">
      
      <div className="grid grid-cols-2 gap-1 max-w-lg">
      <p className="min-h-10"></p>
      <p className="text-center text-lg col-span-2">Task</p>
      <div className="col-span-2">
      <Input placeholder="Task Name" value={taskValue} handleChange={handleTaskValueChange}/>
      </div>

      <div className="col-span-2">
      <Button sendData={sendData}>
        Submit
      </Button>
      </div>
    </div>
  
    </div>
  );
}



export default Topic;
