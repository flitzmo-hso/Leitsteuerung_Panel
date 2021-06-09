import React, { useState, useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function ERPOrders() {

  const columns = [ 
   {name: "O_ID", label: "Order-Nr", options: {filter: true, sort: true, display: true}}, 
   {name: "O_TIMESTAMP", label: "Zeit", options: {filter: true, sort: true, display: true}},
   {name: "O_PRIO", label: "Priorität",  options: {filter: true,  sort: true, display: true}}, 
   {name: "O_WH_IDFROM", label: "O_WH_IDFROM", options: {filter: true, sort: true, display: true}},
   {name: "O_WH_IDTO", label: "O_WH_IDTO", options: {filter: false, sort: true, display: false}},  
   {name: "O_WH_COORDINATEFROM", label: "O_WH_COORDINATEFROM", options: {filter: true, sort: true, display: true}}, 
   {name: "O_WH_COORDINATETO", label: "O_WH_COORDINATETO", options: {filter: false, sort: true, display: false}}, 
   {name: "O_FT_IDREQUIREMENT", label: "O_FT_IDREQUIREMENT", options: {filter: true, sort: false, display: false}},
   {name: "O_OS_ID", label: "O_OS_ID",options: {filter: true,sort: false,display: false}} 
   ];

  const options = {rowsPerPage: 5, customToolbarSelect: () => { }, filterType: 'checkbox', download: false, 
   onRowSelectionChange : (curRowSelected, allRowsSelected) => {rowSelectEvent(curRowSelected, allRowsSelected); }};
  
  const [allData, setAllData] = useState([]); 
  const [selectedData, setSelectedData] =  useState([]); 

  //Event if data changed
  useEffect(() => { DatenLaden(); });
  
  //Load data
  function DatenLaden(){
    axios.get('**GETDATAFROMMYSQL**')
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway

    if(res.data.body.length === 0) { //Check if data is available
      setAllData(undefined);
      return;
    }

    if (DataAreEqual(allData, res.data.body)) return; //Check if data has changed       
    setAllData(res.data.body); //Set new table data

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

    function SubmitOrders() {
        console.log("Ausgewählte Datensätze:", selectedData);
        console.log("Ausgewählte PKs:", filterPks(selectedData));
    }


//Get only primary keys from selected orders
function filterPks(selectedData){
  var _pks = [];
 //TODO: RICHTIGE PKS nehmen
  /*selectedData.forEach(element => {
    var singleVal = {};
    singleVal["O_NR"] = element["O_NR"];
    singleVal["OI_NR"] = element["OI_NR"];
    singleVal["PO_CODE"] = element["PO_CODE"];
    singleVal["PO_COUNTER"] = element["PO_COUNTER"];
    _pks.push(singleVal);
  }); */ 

  return _pks; 
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
    <Button variant="contained" onClick={SubmitOrders} title="Mit Klick auf diesen Button werden alle ausgewählten Transportaufträge übermittelt."/>
   
    </div>
  );
}