import React, { useState, useEffect} from "react";

export default function Orders() {
const [allData, setAllData] = useState("");


useEffect(() => {

    const interval = setInterval(() => { getDateTime() }, 1000)
    return ()=> clearInterval(interval)
  }, []);


function getDateTime(){
  
    var now = new Date();
    //var onlyDate = now.toISOString().slice(0, 10);
    var onlyDate = now.toLocaleDateString('de-DE');
    var hh = ("0" + ((now.getHours()))).slice(-2);
    var mm = ("0" + now.getMinutes()).slice(-2);
    var ss = ("0" + now.getSeconds()).slice(-2);
    var time = "" + hh + ":" + mm + ":" + ss;
    var ActdateTime = " "+ onlyDate + " " + time + "";

    setAllData(String(ActdateTime));
}


return (
     
    <div >
    <h1> {allData} </h1>
</div>
);
}