import React, { useState, useEffect} from "react";
import { ChartDonut, ChartThemeColor} from '@patternfly/react-charts';
import axios from "axios";

export default function KpiAuslastung() {

const [data, setData] = useState([]);     
const [auslastungData, setAuslastungData] = useState([]); 
const [auslastungNumber, setAuslastungNumber] = useState(); 
const [kpiColor, setKpiColor] = useState(ChartThemeColor.orange);

useEffect(() => { getAuslastung(); });

//Get KPI
function getAuslastung()
{ 
  axios.get('http://localhost:8080/robot_list')
      .then(res => {
        console.log("Robot-List:", res)
      if(res.data.length === 0) { //Check if data is availabl
        setData(0)
        setAuslastungData(0);
        setAuslastungNumber(Number(0.00));
        return;
      }       
     
      
      if (DataAreEqual(res.data)) return;  //Check if old data = new data
      setData(res.data);

      calcKPI(res.data); //Calc kpi

      })

      .catch(err => {
          console.log(err.message); //Error-Handling
      })
  } 

    //Check if old data = new data
    function DataAreEqual(newData){
        if(newData.sort().join(',') === data.sort().join(',')){
            return true;
        }
        else return false;
    }

    //Calculate Auslastungsdata
    function calcKPI(data){

    var wholeRobots = 0;
    var RobotsInProgress = 0; 

    data.forEach(element => {
        wholeRobots += 1; 
        var status = String(element['mode']);
        if(status.startsWith("Moving")) {
            RobotsInProgress += 1;
        }
    });

    if(wholeRobots === 0 || RobotsInProgress === 0) 
    {
        setAuslastungNumber(0);
        CalcKpiColor(0); //Set dynamic color
        setAuslastungData([{ x: '', y: 0}, {x: '', y: 0}]); //Set new data   
    }

    var auslastung = (RobotsInProgress / wholeRobots) * 100;

    setAuslastungNumber(auslastung);
    CalcKpiColor(auslastung); //Set dynamic color
    setAuslastungData([{ x: '', y: auslastung}, {x: '', y: 100-auslastung }]); //Set new data    
    return;

  }

  //Set dynamic color 
  function CalcKpiColor(auslastung){
    console.log("Auslastung:", auslastung);
    if (auslastung < 80) setKpiColor(ChartThemeColor.orange);
    else if (auslastung >= 80 && auslastung <= 90) setKpiColor(ChartThemeColor.gold);
    else if (auslastung > 100) setKpiColor(ChartThemeColor.orange);
    else setKpiColor(ChartThemeColor.green);
  }

  return (
    <div style={{ height: '78px', width: '90px', padding: 0, margin: 0}}>  
     
      <ChartDonut
        ariaDesc="Auslastung"
        ariaTitle="Auslastung"
        constrainToVisibleArea={true}
        data={auslastungData}
        height={90}
        labels={({ datum }) => `${datum.x} ${datum.y}%`}
        themeColor={kpiColor}
        title= {Math.round(auslastungNumber, 2) + "%"}
        padding={{
          bottom: 0,
          left: 0,
          right: 0, 
          top: 0
        }}
        width={140}/>

    </div>
  );
}