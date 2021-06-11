import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import axios from "axios";
import { ChartDonut, ChartThemeColor} from '@patternfly/react-charts';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import AndroidIcon from '@material-ui/icons/Android';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Roboterstatus() {

const [allData, setAllData] = useState([]); 
const [cardData, setCardData] = useState([])

useEffect(() => {getRobotsStates();});

function getRobotsStates(){

    axios.get('http://0.0.0.0:8080/robot_list')
    .then(res => {
    console.log("Robotstates:", res.data); //Data from Gateway

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
            <Card>
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
                title={`Robotername: ${elem['robot_name']}`}
                subheader={`Flottenname: ${elem['fleet_name']}`}
              />

              <CardContent>
              <ChartDonut 
                ariaDesc="Batteriestatus"
                ariaTitle="Batteriestatus"
                constrainToVisibleArea={true}
                data={[{ x: '', y: elem['battery_percent']}, {x: '', y: 100-elem['battery_percent'] }]}
                height={50}
                labels={({ datum }) => `${elem['battery_percent']}`}
                //themeColor={ }
                title= {Math.round(elem['battery_percent'], 2) + "%"}
                padding={{
                bottom: 0,
                left: 0,
                right: 0, 
                top: 0
                }}
                width={190}/>
           
               Status: {elem['mode']} <br></br>
               Location X: {elem['location_x']} <br></br>
               Location Y: {elem['location_y']} <br></br>
               Location Yaw: {elem['location_yaw']}
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ))
  </div>
  );
}