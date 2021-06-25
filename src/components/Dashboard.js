import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import KpiAuslastung from './Dashboard/KPI_Auslastung.js';
import Uhrzeit from './Dashboard/Uhrzeit.js';
import ActiveOrders from './Dashboard/ActiveOrders.js'
import Chart from './Dashboard/Chart.js'
import ProgressTime from './Dashboard/ProgressTime.js'


//Set Style
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  container: {
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: "auto",
    padding: "50px",
  },
  fixedHeight: {
    height: "100%",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6} lg={9} >
              <Paper className={classes.paper} elevation={0}>
                
              <ActiveOrders/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
            
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert"}} elevation={0}> 
                <p style={{color: "#e68a00", fontSize:"20px", fontWeight:"bold", padding:"0", alignItems:"center"}}>Auslastung</p>
                  <KpiAuslastung/>  
            
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert" }} elevation={0}>
              <div style={{paddingLeft: "6%"}}>  <Uhrzeit/> </div>
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, margin: 1, flexDirection: "revert" }} elevation={0}>
              <div style={{paddingLeft: "6%"}}>  <ProgressTime/> </div>
              </Paper>
            </Grid>  
            </Grid>

<Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className={classes.paper} elevation={0}>
              <Chart/>
               
              </Paper>
              </Grid>
            </Grid>

          
        </Container>
      </main>
    </div>
  );
}