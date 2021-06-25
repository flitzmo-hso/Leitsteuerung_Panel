import React /*, { useState }*/ from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { Paper } from '@material-ui/core';
//import Paper from '@material-ui/core/Paper';

export default function ManualOrder() {

 //const [DeliveryVisibility, setDeliveryVisibility] = useState("inline");
 //const [LoopVisibility, setLoopVisibility] = useState("none");


    /*{"task_type": "Delivery", "start_time": 0, "priority": 0, 
    "description": { "dropoff_ingestor": "coke_ingestor", "dropoff_place_name": "hardware_2","pickup_dispenser": 
    "coke_dispenser", "pickup_place_name": "pantry" } }) */

  function getFormValues(){

    //Delivery
    var startzeit = document.getElementById('startzeit').value;
    var prio = document.getElementById('prio').value;
    var coordinatefrom = document.getElementById('coordinatefrom').value; 
    var coordinateto = document.getElementById('coordinateto').value; 
    var pickupdispenser = document.getElementById('pickupdispenser').value; 
    var dropoffingestor = document.getElementById('dropoffingestor').value; 

    //Loop
    //var auftragstyp = document.getElementById('auftragstyp').value; 
    //var startLoc = document.getElementById('startLoc').value; //Loop
    //var endLoc = document.getElementById('endLoc').value; //Loop
    //var numberLoops = document.getElementById('numberLoops').value; //Loop



    //Delivery-Order

    if (startzeit === '' || prio === '' || coordinatefrom === '' || coordinateto === '' || pickupdispenser === ''|| dropoffingestor === '')
        { return undefined; }

    /*
        var obj = {}
    obj['task_type'] = "Delivery"; obj['start_time'] = parseInt(startzeit); obj['priority'] = parseInt(prio); 
    obj["description"] = {"dropoff_ingestor": dropoffingestor, "dropoff_place_name": coordinateto, "pickup_dispenser": 
    pickupdispenser, "pickup_place_name": coordinatefrom }; */

    var obj = {"task_type": "Delivery","start_time": parseInt(startzeit), "priority": parseInt(prio),
    "description": {"dropoff_ingestor": dropoffingestor, "dropoff_place_name": coordinateto,
    "pickup_dispenser": pickupdispenser, "pickup_place_name": coordinatefrom }}



    //Loop Order
    /*if (auftragstyp === "Loop") {

      if(startzeit === '' || prio === '' || numberLoops === '' || 
         numberLoops === 0 || startLoc === '' || endLoc === '')  { return undefined;} 
  
      obj['task_type'] = "Loop"; obj['start_time'] = parseInt(startzeit); obj['priority'] = parseInt(prio);
      obj['description'] = {"num_loops": parseInt(numberLoops) , "start_name": startLoc, "finish_name": endLoc};
   
    } */
    
    return obj;

  } 

  //Sleep for asynchronous calls
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

  function sendToAgv(){
    
    var obj = getFormValues();
    if(obj === undefined || obj.length === 0) {alert("Bitte richtige Daten eingeben."); return;} 
    console.log("Auftrag:", obj)


   axios.post('http://0.0.0.0:8080/submit_task', obj)
    .then(res => {
      if(res.data === undefined || res.data.length === 0)  return;
    console.log("Returned Task ID:", res.data['task_id']);

    var taskId = res.data['task_id']

    //Put orders to DB
    PutOrderToDb(obj, taskId);  
  
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
        cssMessage("Fehler beim Übermitteln.", "#9c2c2c"); 
  
    }) 

    return;
  }

  function insertMapping(taskid, orderId, sessionId) {

    console.log("TaskId:", taskid, "OrderId", orderId, "SessionId:", sessionId)
    
    var obj = { "OM_SESSIONID": parseInt(sessionId), "OM_DELIVERYID": taskid, "OM_O_ID": parseInt(orderId), "OM_OT_ID":  2};

    axios.post('http://0.0.0.0:8080/insertMapping', obj)
    .then(res => {

      cssMessage("Erfolgreich übermittelt.", "#4dff88");
  
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
        cssMessage("Fehler beim Übermitteln.", "#9c2c2c"); 
  
    }) 

  }


  function PutOrderToDb(objVal, taskId){

    axios.post('http://0.0.0.0:8080/postOrderManual', objVal)
    .then(res => {
    console.log("DB RESPONSE:", res.data[0]);

      insertMapping(taskId, res.data[0][1], res.data[0][2]);
   
  
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
        cssMessage("Fehler beim Übermitteln.", "#9c2c2c"); 
  
    }) 

return;
  }
 
  //Visibility of input fields for specific order typ
  /*function dropDownChange(newValue){

    if(newValue === undefined || newValue === null) return;

    //Loop
    if (newValue === "Loop") {
      setDeliveryVisibility("none");
      setLoopVisibility("inline");
    }
    
    //Delivery
    if (newValue === "Delivery") {
      setDeliveryVisibility("inline");
      setLoopVisibility("none");
    }
  } */

  return (
    <div align="left" justify="left" alignItems="left">
      <Paper style={{padding:"20px", width:"500px"}}>
 <p style={{color: "#e68a00", fontSize:"20px", fontWeight:"bold"}}>Manueller Fahrauftrag</p>
 <table > 
      {/*<tr>
        <td colspan="1" >
        <select name="auftragstyp"  id="auftragstyp" onChange={e => dropDownChange(e.target.value)}>
            <option  value="Delivery"> Delivery</option>
            <option  value="Loop" >Loop</option>

          </select>
          
          </td> 
      </tr>*/}

      <tr >
        <td colspan="1"> <input defaultValue="0" type="number" id="startzeit" style={{height:"30px"}}/> Startzeit (Minuten ab jetzt)</td>
      </tr>
      <tr >
        <td colspan="1"> <input defaultValue="0" type="number" id="prio" style={{height:"30px"}}/> Priorität </td>
      </tr>
      <tr >
        <td colspan="1"> <input  defaultValue="pantry"  type="text" id="coordinatefrom" style={{height:"30px"}}/> von Koordinate</td>
      </tr>
      <tr >
        <td colspan="1"> <input defaultValue="hardware_2" type="text" id="coordinateto" style={{height:"30px"}}/> nach Koordinate</td>
      </tr>
      <tr >
        <td colspan="1"> <input defaultValue="coke_dispenser" type="text" id="pickupdispenser" style={{height:"30px"}}/> Abholpunkt</td>
      </tr>
      <tr >
        <td colspan="1"> <input defaultValue="coke_ingestor" type="text" id="dropoffingestor" style={{height:"30px"}}/> Abladepunkt</td>
      </tr>
      {/*
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="text" id="startLoc" /> Start-Location</td>
      </tr>
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="text" id="endLoc" /> End-Location</td>
      </tr>
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="number" id="numberLoops" />Nummer an Loops</td>
      </tr> */}
      <tr alignItems="center">
        <br></br>
      <Button 
      
    //variant="contained" 
    style={{backgroundColor: "#e68a00", color:"white"}}
    onClick={sendToAgv} 
    title="Mit Klick auf diesen Button werden manuelle Fahraufträge weitergegeben." >
    Absenden
  </Button>
      </tr>
  </table>
  </Paper>
    </div>
    
  );
}