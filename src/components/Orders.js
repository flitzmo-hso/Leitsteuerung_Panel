import React, { useState, useEffect} from "react";
import TabChange from './Orders/TabChange.js';
import axios from "axios";
 

export default function Orders() {

const [allData, setAllData] = useState([]);

var sessionId;

useEffect(() => {
   

    const interval = setInterval(() => { getTaskStates() }, 2000)
    return ()=> clearInterval(interval)
  }, []);
  

function getTaskStates(){

    axios.get('http://0.0.0.0:8080/task_list')
    .then(res => {
    console.log("Tasks:", res.data); //Data from Gateway

    if(res.data.length === 0) { //Check if data is available
     
      return;
    }

    var newData = [];

    res.data.forEach(element => { //Convert response to right format
        newData.push(element)
    });

    if (DataAreEqual(allData, newData)) return; //Check if data has changed   

    updateOrderStatus(allData, newData); //Update Status of new orders

    setAllData(newData); //Set new Data


    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

}

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function updateOrderStatus(oldData, newData){  

    if (sessionId  === undefined ){ setSessionId() } //Set sessionId by program init

    //TODO : Hier in Zukunft nur die neuen Änderungen. Dazu OldData mit NewData vergleichen.
    //Aktuell werden noch alle genommen.

    sleep(1000).then(() => { 

      for (let element of newData)
       {

        var statusNr;

        //STATUS Überprüfen, ob sie passen -> Pending ?! 
        if(element['state'] === "Pending") statusNr = 1; //open
        else if(element['state'] === "Active/Executing") statusNr = 2; //in progress
        else if(element['state'] === "Completed") statusNr = 3; // Finished
        else if(element['state'] === "Active/Cancelled") statusNr = 4; //canceled
        //else if(element['state'] === "Cancelled") statusNr = 4; //TODO: Nur Cancelled ohne Active?
        else if(element['state'] === "Queued") statusNr = 5; //waiting
        else if(element['state'] === "Failed") statusNr = 6; //Fehler
       
        if(statusNr === "" || sessionId === "" || element["task_id"] === "" || element["robot_name"] === ""  
        || statusNr === undefined || sessionId === undefined || element["task_id"] === undefined || element["robot_name"] === undefined || 
          sessionId.length === 0 || element["task_id"].length === 0 || element["robot_name"].length === 0) continue;

        var obj = {"status": statusNr, "session_id":  sessionId, "task_id": element["task_id"], "agv_id": element["robot_name"]}; 

        console.log("PUT OBJ:", obj);

        axios.put('http://0.0.0.0:8080/updateOrderStatus', obj)
        .then(res => {
          if(res.data === undefined || res.data.length === 0)  return;
        console.log("Response:", res.data);
        
      
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
            cssMessage("Fehler beim Auftrag übermitteln.", "#9c2c2c");       
        })  
        
    }
  });

  } 

  function setSessionId(){

      axios.get('http://0.0.0.0:8080/getSessionId')
      .then(res => {
      console.log("SessionId:", res.data); //Data from Gateway

      if(res.data.length === 0) { //Check if data is available
      
        return;
      }
      
      sessionId = res.data;

      })
      .catch(err => {
          console.log(err.message); //Error-Handling
      })

  }

  //Success and error messages
function cssMessage(message, color)
{ //Set
  document.getElementsByClassName("footer")[0].style.textAlign = "center";
  document.getElementsByClassName("footer")[0].innerHTML = message;
  document.getElementsByClassName("footer")[0].style.backgroundColor = color;

  //Reset
  sleep(4000).then(() => { 
  document.getElementsByClassName("footer")[0].style.textAlign = "right";
  document.getElementsByClassName("footer")[0].innerHTML = "Powered by ©Flitzmo";
  document.getElementsByClassName("footer")[0].style.backgroundColor = "#004466";
  });
}


  //Check if old data = new data
  function DataAreEqual(inputData, sortedOrders){
    if(inputData.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
   }

    return (
        <div >
         <TabChange/>
        </div>
    );

}
