import React from 'react';
import { Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ArchiveIcon from '@material-ui/icons/Archive';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import ManualOrder from './ManualOrder';
import OpenOrders from './OpenOrders';
import WaitingOrders from './WaitingOrders'
import Auftragsstatus from './Auftragsstatus'
import DoneOrders from './DoneOrders';
import CanceledOrders from './CanceledOrders'
import ErrorOrders from './ErrorOrders'

//Set style
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textColor: "blue",
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },  
}));

//Change tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          TabIndicatorProps={{style: {backgroundColor: "#ff9900"}}}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="#ff9900"
          textColor="#ff9900"
          aria-label="scrollable force tabs example" >
          <Tab label="Manueller Fahrauftrag" icon={<PostAddIcon style={{fill:"#e68a00"}}/> } {...a11yProps(2)} style={{color:"black"}}/>
          <Tab label="Automatische Fahraufträge" icon={<ArchiveIcon style={{fill:"#e68a00"}}/>} {...a11yProps(3)} style={{color:"black"}}/>
          <Tab label="Ausstehende Fahraufträge" icon={<HourglassEmptyIcon  style={{fill:"#e68a00"}}/>} {...a11yProps(4)} style={{color:"black"}}/>
          <Tab label="Aktive Aufträge" icon={<PlayCircleOutlineIcon style={{fill:"#e68a00"}}/>} {...a11yProps(5)} style={{color:"black"}}/>
          <Tab label="Abgeschlosse Aufträge" icon={<AssignmentTurnedInIcon style={{fill:"#e68a00"}}/>} {...a11yProps(6)} style={{color:"black"}}/>
          <Tab label="Abgebrochene Aufträge" icon={<CancelIcon style={{fill:"#e68a00"}}/>} {...a11yProps(7)} style={{color:"black"}}/>
          <Tab label="Fehlerhafte Aufträge" icon={<ErrorOutlineIcon style={{fill:"#e68a00"}}/>} {...a11yProps(8)} style={{color:"black"}}/>
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <ManualOrder/>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <OpenOrders/> 
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={2}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <WaitingOrders/> 
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={3}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <Auftragsstatus/> 
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={4}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <DoneOrders/> 
            </Grid>
        </div> 
      </TabPanel>    
      <TabPanel value={value} index={5}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <CanceledOrders/> 
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={6}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <ErrorOrders/> 
            </Grid>
        </div> 
      </TabPanel> 
    </div>
)
}