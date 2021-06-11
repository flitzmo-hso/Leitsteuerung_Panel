import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import axios from "axios";
import { ChartDonut } from '@patternfly/react-charts';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import AndroidIcon from '@material-ui/icons/Android';



export default function Auftragsstatus() {

const [allData, setAllData] = useState([]); 
const [cardData, setCardData] = useState([])

useEffect(() => {getTaskStates();});

function getTaskStates(){

    axios.get('http://0.0.0.0:8080/task_list')
    .then(res => {
    console.log("Taskstatus:", res.data); //Data from Gateway

    if(res.data.length === 0) { //Check if data is available
      //Karten auf null setzen
      return;
    }
   
    if(DataAreEqual(res.data)) return;
    setAllData(res.data); //Set new table data
    setCardData(res.data);

    })
    .catch(err => {
        console.log(err.message); //Error-Handling
    })
}


  //Check if old data = new data
  function DataAreEqual(newData){

    if(newData.sort().join(',') === allData.sort().join(',')){
      return true;
      }
      else return false;
    }

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start">

        {cardData.map((elem) => (
          <Grid item xs={3} key={cardData.indexOf(elem)}>
            <Card style={{border:"2px solid grey"}}>  
              <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor:"green"}}>
                  <AndroidIcon/>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <ClearIcon />
                </IconButton>
              }
                title={`Task-ID: ${elem['task_id']}`}
                subheader={`Typ: ${elem['task_type']}`}
              />


              <CardContent>
              <ChartDonut
                ariaDesc="Batteriestatus"
                ariaTitle="Batteriestatus"
                constrainToVisibleArea={true}
                data={[{ x: '', y: parseInt(elem['progress'][-1])}, {x: '', y: 100-parseInt(elem['progress'][-1]) }]}
                height={90}
                width={190}
                labels={({ datum }) => `${elem['progress']}`}
                //themeColor={ }
                title= {elem['progress']}
                padding={{
                bottom: 0,
                left: 0,
                right: 0, 
                top: 0
                }}/>
  
               Status: {elem['state']} <br></br>
               Erledigt: {elem['done']} <br></br>
               Robotername: {elem['robot_name']} <br></br>
               Flottename: {elem['fleet_name']} <br></br>
               Priorität: {elem['priority']} <br></br>
               Übermittelte Startzeit: {elem['submited_start_time']} <br></br>
               Wirkliche Startzeit: {elem['start_time']} <br></br>
               Endzeit: {elem['startend_time_time']} <br></br>    
               Beschreibung: {elem['description']} <br></br>
                  
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    
  </div>
  );
}