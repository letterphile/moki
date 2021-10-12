
import gapProperties from 'postcss-gap-properties';
import Button from './Button'
import axios from 'axios'
import Input from './Input';
import Navigation from './Navigation';
import React, { useEffect, useState } from 'react';
import RadioInput from './RadioInput'

function Home(props) {
    const [taskValue, setTaskValue] = useState("");
    const [etcValue, setEtcValue] = useState("");
    const [startDateValue, setStartDateValue ] = useState("");
    const [startTimeValue, setStartTimeValue] = useState("");
    const [deadDateValue, setDeadDateValue] = useState("");
    const [deadTimeValue, setDeadTimeValue] = useState("");
    const [radioValue,setRadioValue] = useState("1")
    props.changePage("home")
    function handleTaskValueChange (e) {
        setTaskValue(e.target.value)
      }

      function handleEtcValueChange (e) {
        setEtcValue(e.target.value)
      }

      function handleStartDateValueChange(e){
        setStartDateValue(e.target.value)
      }

      function handleStartTimeValueChange(e){
        setStartTimeValue(e.target.value)
      }

      function handleDeadDateValueChange(e){
        setDeadDateValue(e.target.value)
      }

      function handleDeadTimeValueChange(e){
        setDeadTimeValue(e.target.value)
      }

      function handleRadio(value){
        setRadioValue(value)
      }
      function sendData(){
                const etcFloat = parseFloat(etcValue)
                const ltdValue= etcFloat*60
            if(startDateValue!=""){
                const formatedDate = startDateValue.split('/').reverse().join('-')
              
                const startDateTime = formatedDate+"T"+startTimeValue+"+01:00"
                
                axios.post(`${process.env.REACT_APP_API_ADDRESS}/fixed_task/create`,{
                  task:{
                    name:taskValue,
                    status:"status",
                    etc:etcFloat,
                    session_done:0,
                    hours_left:etcFloat
                  },
                  time:startDateTime,
                  ltd:ltdValue,
                  radio:radioValue
                }).then(response=>{
                  if(response.status==200){
                    console.log("setting states")
                      setTaskValue("")
                      setStartDateValue("")
                      setEtcValue("")
                      setStartTimeValue("")
                      setDeadDateValue("")
                      setDeadTimeValue("")
                  }
                }).catch(error => console.log(error))

                // axios.get("localhost:8000").then(r=>console.log(r)).catch(e=>console.log(e))
            }
            else{
                const formatedDeadDate = deadDateValue.split('/').reverse().join('-')
                let formatedDeadDateTime = ""
                if(deadDateValue!=""){
                formatedDeadDateTime = formatedDeadDate+"T"+deadTimeValue+"+00:00"
                }
              axios.post(`${process.env.REACT_APP_API_ADDRESS}/task/create`,{
                

                  "name":taskValue,
                  "status":"status",
                  "etc":etcFloat,
                  "deadline":formatedDeadDateTime,
                  "session_done":0,
                   "hours_left":etcFloat
                  
              }).then(response=>{
                if(response.status==200){
                    console.log("setting states")
                    setTaskValue("")
                    setStartDateValue("")
                    setEtcValue("")
                    setStartTimeValue("")
                    setDeadDateValue("")
                    setDeadTimeValue("")
                }
                }).catch(error => console.log(error))
            }
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
      <Input placeholder="Expected Time To Complete" value={etcValue} handleChange={handleEtcValueChange}/>
      </div>
      <Input placeholder="Start Date" value={startDateValue} handleChange={handleStartDateValueChange}/>
      <Input placeholder="Start Time" value={startTimeValue} handleChange={handleStartTimeValueChange}/>
      <Input placeholder="Deadline Date" value={deadDateValue} handleChange={handleDeadDateValueChange}/>
      <Input placeholder="Deadline Time" value={deadTimeValue} handleChange={handleDeadTimeValueChange}/>

    <div>
      <label className="inline-flex items-center">
      <RadioInput value="1" handleChange={handleRadio} chosen={radioValue}/>
        <span className="ml-2">Once</span>
      </label>
    </div>
    <div>
      <label className="inline-flex items-center">
        <RadioInput value="2" handleChange={handleRadio} chosen={radioValue}/>
        <span className="ml-2">Everyday</span>
      </label>
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



export default Home;
