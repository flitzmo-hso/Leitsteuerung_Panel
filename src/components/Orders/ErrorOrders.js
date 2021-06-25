import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function ErrorOrders() {

  const columns = [ 
   {name: "O_ID", label: "Order-Nr", options: {filter: true, sort: true, display: true}}, 
   {name: "OT_DESC", label: "Order-Typ", options: {filter: true, sort: true, display: true}}, 
   {name: "O_TIMESTAMP", label: "Zeit", options: {filter: true, sort: true, display: true}},
   {name: "O_PRIO", label: "Priorität",  options: {filter: true,  sort: true, display: true}}, 
   {name: "O_WH_IDFROM", label: "von Lagerplatz", options: {filter: false, sort: false, display: false}},
   {name: "O_WH_COORDINATEFROM", label: "von Koordinate", options: {filter: true, sort: true, display: true}}, 
   {name: "O_WH_IDTO", label: "nach Lagerplatz", options: {filter: false, sort: true, display: false}},  
   {name: "O_WH_COORDINATETO", label: "nach Koordinate", options: {filter: true, sort: true, display: true}}, 
   {name: "O_DP_DELIVERYPOINTFROM", label: "Aufladepunkt", options: {filter: true, sort: true, display: true}}, 
   {name: "O_DP_DELIVERYPOINTTO", label: "Abladepunkt", options: {filter: true, sort: true, display: true}}, 
   {name: "O_FT_IDREQUIREMENT", label: "Benötiges Anbaugerät", options: {filter: true, sort: true, display: true}},
   {name: "O_OS_ID", label: "Status ID",options: {filter: false, sort: false,display: false}},
   {name: "OS_DESC", label: "Status",options: {filter: true,sort: true,display: true}} 
   ];

  const options = {rowsPerPage: 5, customToolbarSelect: () => { }, filterType: 'checkbox', download: false, 
   onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden(); });
  
  //Load data
  function DatenLaden(){
    axios.get('http://0.0.0.0:8080/getDBOrders?status=6')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway

    if(res.data.length === 0) { //Check if data is available
      setAllData(undefined);
      return;
    }

    if (DataAreEqual(allData, res.data)) return; //Check if data has changed    
    console.log("Data:", res.data);    
    setAllData(res.data); //Set new table data

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })

  }

  //Check if old data = new data
  function DataAreEqual(data, sortedOrders){
    if(data.sort().join(',') === sortedOrders.sort().join(',')){
      return true;
      }
      else return false;
    }

  //Submit selected Table Orders
  function SubmitOrders() {

    console.log("Ausgewählte Datensätze:", selectedData);

    if(selectedData === undefined || selectedData.length === 0) {
      alert("Bitte Datensatz auswählen!"); return; 
    }

    selectedData.forEach(element => {

      var singleSubmits = filterSelectedData(element);

      axios.post('http://0.0.0.0:8080/submit_task', singleSubmits)
      .then(res => {
      console.log("Returned Task ID:", res.data['task_id']);

      PutOrderToDb(singleSubmits, res.data['task_id']);  

      cssMessage("Erfolgreich übermittelt.", "#4dff88"); 
    
      })
      .catch(err => {
          console.log(err.message); //Error-Handling
          cssMessage("Fehler beim Übermitteln.", "#9c2c2c"); 
    
      }) 
      
    });
      
    }

    function PutOrderToDb(objVal, taskId){

      axios.post('http://0.0.0.0:8080/postOrderAutomatic', objVal)
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

    function insertMapping(taskid, orderId, sessionId) {

      console.log("TaskId:", taskid, "OrderId", orderId, "SessionId:", sessionId)
      
      var obj = { "OM_SESSIONID": parseInt(sessionId), "OM_DELIVERYID": taskid, "OM_O_ID": parseInt(orderId), "OM_OT_ID":  1};
  
      axios.post('http://0.0.0.0:8080/insertMapping', obj)
      .then(res => {
  
        cssMessage("Erfolgreich übermittelt.", "#4dff88"); 
    
      })
      .catch(err => {
          console.log(err.message); //Error-Handling 
          cssMessage("Fehler beim Übermitteln.", "#9c2c2c"); 
    
      }) 
  
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

    function filterSelectedData(element){
 
      //Delivery Order 
      console.log(element);

        if (element["O_DP_DELIVERYPOINTTO"] === '' || element["O_DP_DELIVERYPOINTFROM"]  === '' || element["O_WH_COORDINATETO"] === '' || element["O_WH_COORDINATEFROM"] === '')  return undefined;

        var obj = {"task_type": "Delivery", "start_time": 0, "priority": 0,
            "description": {"dropoff_ingestor": element["O_DP_DELIVERYPOINTTO"], "dropoff_place_name": element["O_WH_COORDINATETO"],
            "pickup_dispenser": element["O_DP_DELIVERYPOINTFROM"], "pickup_place_name": element["O_WH_COORDINATEFROM"] }};

        console.log("Filtered Obj:", obj);


      //Loop Order
      /*if (element["task_type"] === "Loop") {

        if(element["start_time"] === '' || element["priority"]  === '' || element["num_loops"]  === ''  || 
        element["num_loops"]  === 0 ||  element["start_name"]  === '' ||  element["finish_name"]  ===  '')  return undefined; 

        obj['task_type'] = "Loop"; obj['start_time'] = parseInt(element["start_time"]); 
        obj['priority'] = parseInt(element["priority"]); 
        obj['description'] = {"num_loops": parseInt(element["num_loops"]) , "start_name": element["start_name"], "finish_name": element["finish_name"]};
      
    }*/

    return obj;
    }

//RowSelectEvent
function rowSelectEvent(curRowSelected, allRowsSelected){ 

  var _selectedData = [];

  if(allRowsSelected.length === 0) {  //Wenn keine Rows ausgewählt sind
    setSelectedData(undefined);
    return;
  }
  
  allRowsSelected.forEach(element => { //Get selected orders
    _selectedData.push(allData[element.dataIndex])
  });

  setSelectedData(_selectedData);

  return;
}

  return (
  <div align="left">
    
    <MUIDataTable 
        title={"Transportaufträge"}
        data={allData}      
        columns={columns}
        options={options}/>
    <br/>
    <br/>
    {/*<Button style={{backgroundColor: "#e68a00", color:"white"}}
    variant="contained" 
    onClick={SubmitOrders} 
    title="Mit Klick auf diesen Button werden alle ausgewählten Transportaufträge übermittelt.">
       Absenden
    </Button>*/}
   
    </div>
  );
}