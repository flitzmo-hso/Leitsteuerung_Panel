import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function CanceledOrders() {

  const columns = [ 
   {name: "O_ID", label: "Order-Nr", options: {filter: true, sort: true, display: true}}, 
   {name: "OT_DESC", label: "Order-Typ", options: {filter: true, sort: true, display: true}}, 
   {name: "O_TIMESTAMP", label: "Zeit", options: {filter: true, sort: true, display: true}},
   {name: "O_PRIO", label: "Priorität",  options: {filter: true,  sort: true, display: true}}, 
   {name: "O_WH_IDFROM", label: "O_WH_IDFROM", options: {filter: false, sort: false, display: false}},
   {name: "O_WH_IDTO", label: "O_WH_IDTO", options: {filter: false, sort: true, display: false}},  
   {name: "O_WH_COORDINATEFROM", label: "Koordinate Von", options: {filter: true, sort: true, display: true}}, 
   {name: "O_WH_COORDINATETO", label: "Koordinate Nach", options: {filter: true, sort: true, display: true}}, 
   {name: "O_FT_IDREQUIREMENT", label: "Benötiges Anbaugerät", options: {filter: true, sort: true, display: true}},
   {name: "O_OS_ID", label: "O_OS_ID",options: {filter: false, sort: false,display: false}},
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
    axios.get('http://0.0.0.0:8080/getDBOrders?status=4') 
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

      axios.post('http://0.0.0.0:8080/submit_task', selectedData)
      .then(res => {
      console.log("RESPONSE:", res);
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
  document.getElementsByClassName("footer")[0].style.backgroundColor = "#90caf9";
  });
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
    <Button style={{backgroundColor: "gray"}}
    variant="contained" 
    onClick={SubmitOrders} 
    title="Mit Klick auf diesen Button werden alle ausgewählten Transportaufträge übermittelt.">
       Absenden
    </Button>
   
    </div>
  );
}