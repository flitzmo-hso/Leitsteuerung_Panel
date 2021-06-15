import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function ERPOrders() {

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
    axios.get('http://0.0.0.0:8080/getDBOrders?status=1')
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
      console.log("RESPONSE:", res);
      alert("Erfolgreich übermittelt."); 
    
      })
      .catch(err => {
          console.log(err.message); //Error-Handling
          alert("Fehler.");  
    
      }) 
      
    });
      
    }


    function filterSelectedData(element){

      var obj = {};
 
      //Delivery Order
      if (element["task_type"] === "Delivery") {

        if (element["start_time"] === '' || element["priority"]  === '' || element["option"] === '') return undefined;

        obj['task_type'] = "Delivery"; obj['start_time'] = parseInt(element["start_time"]); 
        obj['priority'] = parseInt(element["priority"]); obj["description"] = {"option": element["option"]};
      
      }

      //Loop Order
      if (element["task_type"] === "Loop") {

        if(element["start_time"] === '' || element["priority"]  === '' || element["num_loops"]  === ''  || 
        element["num_loops"]  === 0 ||  element["start_name"]  === '' ||  element["finish_name"]  ===  '')  return undefined; 

        obj['task_type'] = "Loop"; obj['start_time'] = parseInt(element["start_time"]); 
        obj['priority'] = parseInt(element["priority"]); 
        obj['description'] = {"num_loops": parseInt(element["num_loops"]) , "start_name": element["start_name"], "finish_name": element["finish_name"]};
      
    }

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
    <Button style={{backgroundColor: "gray"}}
    variant="contained" 
    onClick={SubmitOrders} 
    title="Mit Klick auf diesen Button werden alle ausgewählten Transportaufträge übermittelt.">
       Absenden
    </Button>
   
    </div>
  );
}