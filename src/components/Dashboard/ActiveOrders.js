import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
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

  const options = {rowsPerPage: 3, customToolbarSelect: () => { }, selectableRows: false, download: false};
  
  const [allData, setAllData] = useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden(); });
  
  //Load data
  function DatenLaden(){
    axios.get('http://0.0.0.0:8080/getDBOrders?status=2')
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

  return (
  <div align="left">
    
    <MUIDataTable 
        title={<p style={{color: "#e68a00", fontSize:"20px", fontWeight:"bold", padding:"0", alignItems:"center"}}>Aktive Transportaufträge</p>}
        data={allData}      
        columns={columns}
        options={options}/>
   
    </div>
  );
}