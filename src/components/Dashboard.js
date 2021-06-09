import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
  },
  fixedHeight: {
    height: 240,
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

            <Grid item xs={12} md={6} lg={9}>
              <Paper className={fixedHeightPaper}>
            Flitzmo Map 
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert"}}>
               <h2>&nbsp; Kennzahl 1</h2>
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, marginBottom: 3, flexDirection: "revert" }}>
               <h2>&nbsp; Kennzahl 2</h2>
              </Paper>
              <Paper className={classes.paper} style={{  padding: 0, margin: 1, flexDirection: "revert" }}>
               <h2>&nbsp; Kennzahl 3</h2>
              </Paper>
            </Grid>  

            <Grid item xs={12} md={12}>
              <Paper className={classes.paper}>
                Aktive Fahraufträge auf den ersten Blick 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}