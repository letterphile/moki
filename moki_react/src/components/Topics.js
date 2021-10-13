
import gapProperties from 'postcss-gap-properties';
import Button from './Button'
import axios from 'axios'
import Input from './Input';
import Navigation from './Navigation';
import TopicTable from './TopicTable';
import React, { useEffect, useState } from 'react';


function Topic(props) {
    
    const [topicValue, setTopicValue] = useState("");
    const [topics,setTopics] = useState([])
    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_ADDRESS}/topics/`)
        .then(
            (response=>{
                setTopics(response.data.info)
            })
        ).catch((e)=>{
            console.log(e)
        })
      },[])
    props.changePage("topics")
    function handleTaskValueChange (e) {
        setTopicValue(e.target.value)
      }

      function sendData(){
             
                
                axios.post(`${process.env.REACT_APP_API_ADDRESS}/topics/create`,{

                  "name":topicValue,
                  "startDate":"2021-09-25",
                  "status":false,
                  "revisionDates":[
                      {
                          
                          "date":"2021-09-25"
                      }
                  ]
              }).then(response=>{
                  if(response.status==200){
                    console.log("setting states")
                      setTopicValue("")
                      axios.get(`${process.env.REACT_APP_API_ADDRESS}/topics/`)
                      .then(
                          (response=>{
                              console.log("tom cruise")
                              setTopics(response.data.info)
                          })
                      ).catch((e)=>{
                          console.log(e)
                      })
                  }
                }).catch(error => console.log(error))

                

                // axios.get("localhost:8000").then(r=>console.log(r)).catch(e=>console.log(e))
            }
            
      

  return (
    <div className="grid place-items-center pt-20">
      <p className="min-h-10"></p>
      <p className="text-center text-lg col-span-2">Topic</p>
      <div className="col-span-2">
      <Input placeholder="Topic" value={topicValue} handleChange={handleTaskValueChange}/>
      </div>

      <div className="col-span-2">
      <Button sendData={sendData}>
        Submit
      </Button>
      </div>
      <TopicTable topics={topics}/>
    </div>
  

  );
}



export default Topic;
