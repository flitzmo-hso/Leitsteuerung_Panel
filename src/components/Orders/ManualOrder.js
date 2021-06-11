import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
//import Paper from '@material-ui/core/Paper';

export default function ManualOrder() {

 const [DeliveryVisibility, setDeliveryVisibility] = useState("inline");
 const [LoopVisibility, setLoopVisibility] = useState("none");

   /*[                  ---------------EXAMPLE----------------
      {"task_type":"Loop", "start_time":0, "priority":0, "description": {"num_loops":5, "start_name":"coe", "finish_name":"lounge"}},
      {"task_type":"Delivery", "start_time":0, "priority":0, "description": {"option": "coke"}},
      {"task_type":"Loop", "start_time":0, "priority":0, "description": {"num_loops":5, "start_name":"pantry", "finish_name":"supplies"}}
    ] */


  function getFormValues(){

    var startzeit = document.getElementById('startzeit').value;
    var prio = document.getElementById('prio').value;
    var auftragstyp = document.getElementById('auftragstyp').value; 
    var auftragDelivery = document.getElementById('auftragDelivery').value; //Delivery
    var startLoc = document.getElementById('startLoc').value; //Loop
    var endLoc = document.getElementById('endLoc').value; //Loop
    var numberLoops = document.getElementById('numberLoops').value; //Loop

    var obj = {}

    //Delivery Order
    if (auftragstyp === "Delivery") {

      if (startzeit === '' || prio === '' || auftragDelivery === '')
         { return undefined; }

      obj['task_type'] = "Delivery"; obj['start_time'] = parseInt(startzeit); obj['priority'] = parseInt(prio); 
      obj["description"] = {"option": auftragDelivery};
    }

    //Loop Order
    if (auftragstyp === "Loop") {

      if(startzeit === '' || prio === '' || numberLoops === '' || 
         numberLoops === 0 || startLoc === '' || endLoc === '')  { return undefined;} 
  
      obj['task_type'] = "Loop"; obj['start_time'] = parseInt(startzeit); obj['priority'] = parseInt(prio);
      obj['description'] = {"num_loops": parseInt(numberLoops) , "start_name": startLoc, "finish_name": endLoc};
   
    }

    return [obj];

  } 


  function sendToAgv(){
    
    var objVal = getFormValues();
    if(objVal === undefined || objVal.length === 0) {alert("Bitte richtige Daten eingeben."); return;} 
    console.log("Auftrag:", objVal)
    objVal.forEach(element => {
      console.log(element)
    });
 
    //axios.post('http://0.0.0.0:8080/submit_task', objVal)
    axios.post('http://0.0.0.0:8080/submit_task',[{'task_type':"Loop", 'start_time':0, 'priority':0, 'description': {'num_loops':5, 'start_name':"coe", 'finish_name':"lounge"}}])
    .then(res => {
    console.log("RESPONSE:", res);
    alert("Erfolgreich übermittelt."); 
  
    })
    .catch(err => {
        console.log(err.message); //Error-Handling
        alert("Fehler.");  
  
    }) 

    return;
  }
 
  //Visibility of input fields for specific order typ
  function dropDownChange(newValue){

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
  } 

  return (
    <div align="left" justify="left" alignItems="left">
 <p>Manueller Fahrauftrag</p>
 <table > 
      <tr>
        <td colspan="1" >
        <select name="auftragstyp"  id="auftragstyp" onChange={e => dropDownChange(e.target.value)}>
            <option  value="Delivery"> Delivery</option>
            <option  value="Loop" >Loop</option>
           {/*<option  value="Clean" >Clean</option> */} 
          </select>
          
          </td> 
      </tr>
      <tr >
        <td colspan="1"> <input type="number" id="startzeit" /> Startzeit (Minuten von jetztab)</td>
      </tr>
      <tr >
        <td colspan="1"> <input type="number" id="prio" /> Priorität </td>
      </tr>
      <tr id = "Delivery" >
        <td colspan="1" style={{display: DeliveryVisibility}}> <input type="text" id="auftragDelivery" /> Auftrag-Delivery</td>
      </tr>
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="text" id="startLoc" /> Start-Location</td>
      </tr>
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="text" id="endLoc" /> End-Location</td>
      </tr>
      <tr id = "Loop" >
        <td colspan="1" style={{display: LoopVisibility}}> <input type="number" id="numberLoops" />Nummer an Loops</td>
      </tr>
      <tr >
      <Button 
    //variant="contained" 
    style={{backgroundColor: "gray"}}
    onClick={sendToAgv} 
    title="Mit Klick auf diesen Button werden manuelle Fahraufträge weitergegeben." >
    Absenden
  </Button>
      </tr>
  </table>
    </div>
    
  );
}