import React, { useState, useEffect} from "react";
import axios from "axios";

export default function KpiAuslastung() {

const [time, setTime] = useState("");     
const [anzFinish, setAnzFinish] = useState("");   
const [avgTime, setAvgTime] = useState("");  

useEffect(() => { getProgessTime(); });

//Get KPI
function getProgessTime()
{ 
  axios.get('http://localhost:8080/getProgressTime')
      .then(res => {
        console.log("Progresstime:", res)
      if(res.data.length === 0) { //Check if data is availabl
        setTime(0)
        setAnzFinish(0)
        setAvgTime(0)
        return;
      }       
    
      
      //if (DataAreEqual(res.data)) return;  //Check if old data = new data
      setTime(String(res.data[0]))
      setAnzFinish(String(res.data[1]))
      setAvgTime(String(res.data[2]))

      })

      .catch(err => {
          console.log(err.message); //Error-Handling
      })
  } 


  return (
    <div style={{ paddig: "30", height: '78px', padding: 0, margin: 0}}>  
<p></p>
    <b>Gesamte Abwicklungszeit: </b>{ time} Min.<br/>
    <b>Fertige Aufträge:</b> {anzFinish} Min.<br/>
     <b>durchn. Zeit je Auftrag: </b>{avgTime} Min.

    </div>
  );
}