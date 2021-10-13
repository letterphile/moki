import axios from 'axios'
import React, { useEffect, useState } from 'react';
function TopicTable(props){
    
    const topics = props.topics
    return(
        <div className="relative">
        
        <div className="pt-12 grid place-items-center ">

        <table className="table-fixed max-w-4xl  bg-green-100 shadow-lg rounded-lg">
  <thead>
    <tr>
      <th className="w-1/4 ...">Topic</th>
      <th className="w-1/4 ...">Number of Revisions</th>
    </tr>
  </thead>
  <tbody>

   
{
            
            topics.map((s,i)=>{
             
      
            return (
                <tr key={i}>
          {/* <td className="text-left ">{new Date(s.time).toUTCString()}</td> */}
          <td className="text-left">{s.name}</td>
          <td className="text-center">{s.numberOfRevisions}</td>
         
        </tr> 
            
            )
            }
            )
            

        }
  </tbody>
</table>
</div>
</div>
    )
}

export default TopicTable;