import React, { useState, useEffect, forwardRef } from "react";
//import axios from "axios";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function ManageRobots() {

//Event if data changed  
useEffect(() => { LoadRobots(); });

const [allData, setAllData] = useState([]); 
  

const [columnsRobots, /* setColumnsColors */] = useState([
    { title: 'Mat-Bestellnr.', field: 'prodmat_id', editable: 'never' },
    { title: 'Charge', field: 'chargen_nr', editable: 'never' },
    { title: 'Menge', field: 'quantity', editable: 'never' },
    { title: 'Restmenge', field: 'RES_QTY', editable: 'onUpdate', cellStyle: {border: "5px, #000000", fontWeight: "bold", fontStyle: "italic", backgroundColor: "#e3e3e3"} },
    { title: 'PPML', field: 'ppml', editable: 'never' },
    { title: 'Viskosität', field: 'viscosity', editable: 'never' },
    { title: 'Delta_e', field: 'delta_e', editable: 'never' },
  ]);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const options = {rowsPerPage: 5, customToolbarSelect: () => { }, selectableRows: false, download: false };

//Load data  
function LoadRobots(){

    /*axios.get('http://0.0.0.0:8080/getDBOrders?status=4') 
    .then(res => {
    console.log("RESPONSE:", res); //Data from Gateway

    if(res.data.length === 0) { //Check if data is available
      //setAllData(undefined);
      return;
    }

   // if (DataAreEqual(allData, res.data)) return; //Check if data has changed    
    console.log("Data:", res.data);    
    //setAllData(res.data); //Set new table data

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    }) */
}


//Check if old data = new data
/*function DataAreEqual(data, sortedOrders){
if(data.sort().join(',') === sortedOrders.sort().join(',')){
  return true;
  }
  else return false;
} */



  return (
<div style={{ padding: '0px'}}>
  <MaterialTable
        title="Roboter"
        icons={tableIcons}
        columns={columnsRobots}
        data={allData} 
        options={options}/>
  <br></br>
</div>

  );
}
