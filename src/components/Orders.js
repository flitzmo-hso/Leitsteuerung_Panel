import React, { useState, useEffect} from "react";
import TabChange from './Orders/TabChange.js';
import axios from "axios";
 

export default function Orders() {

const [allData, setAllData] = useState([]);
const [sessionId, setSessionId] = useState("");

getSessionId(); //Set sessionID once by initializing


useEffect(() => {
    getTaskStates()
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

    updateStatusOfNewOrders(allData, newData); //Update Status of new orders

    setAllData(newData); //Set new Data


    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

}


  function updateStatusOfNewOrders(oldData, newData){  

    console.log("SessionId:", sessionId);

    //TODO : Hier in Zukunft nur die neuen Änderungen. Dazu OldData mit NewData vergleichen.
    //Aktuell werden noch alle genommen.

    newData.forEach(element => {

        var statusNr;

        if(element['state'] === "NOT USED HERE") statusNr = 1; //open
        else if(element['state'] === "Active/Executing") statusNr = 2; //in progress
        else if(element['state'] === "Completed") statusNr = 3; // Finished
        else if(element['state'] === "Active/Cancelled") statusNr = 4; //canceled
        else if(element['state'] === "Queued") statusNr = 5; //waiting

        /*axios.put('http://0.0.0.0:8080/updateOrderStatus?status='+statusNr, "FORMATEDOBJ BZW NUR NUMMER?")
        .then(res => {
          if(res.data === undefined || res.data.length === 0)  return;
        console.log("Returned Task ID:", res.data['task_id']);
    
        var taskId = res.data['task_id']
    
      
        })
        .catch(err => {
            console.log(err.message); //Error-Handling
            alert("Fehler beim Auftrag übermitteln.");  
      
        })  */
        
    });

  }


  //Check if old data = new data
  function DataAreEqual(inputData, sortedOrders){
    if(inputData.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
   }


   function getSessionId(){

    axios.get('http://0.0.0.0:8080/getSessionId')
    .then(res => {
    console.log("SessionId:", res.data); //Data from Gateway

    if(res.data.length === 0) { //Check if data is available
     
      return;
    }
    
    setSessionId(String(res.data));

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

    }



    return (
        <div >
         <TabChange/>
        </div>
    );

}
