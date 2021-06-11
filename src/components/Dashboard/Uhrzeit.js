import React from 'react';

function getDateTime(){
  
    var now = new Date();
    //var onlyDate = now.toISOString().slice(0, 10);
    var onlyDate = now.toLocaleDateString('de-DE');
    var hh = ("0" + ((now.getHours())+9)).slice(-2);
    var mm = ("0" + now.getMinutes()).slice(-2);
    var ss = ("0" + now.getSeconds()).slice(-2);
    var time = "" + hh + ":" + mm + ":" + ss;
    var ActdateTime = " "+ onlyDate + " " + time + "";

    return ActdateTime;
}

const Uhrzeit = () => {
    return (
       
        <div >
            <h1> {getDateTime()} </h1>
        </div>
    )
}

export default Uhrzeit