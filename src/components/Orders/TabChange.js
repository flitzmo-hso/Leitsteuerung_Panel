import React from 'react';
import { Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Box from '@material-ui/core/Box';
import AdbIcon from '@material-ui/icons/Adb';

import ManualOrder from './ManualOrder';
import ERPOrders from './ERPOrders';
import Roboterstatus from './Roboterstatus'
import Auftragsstatus from './Auftragsstatus'
import DoneOrders from './DoneOrders';

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
    textColor: "green",
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
          TabIndicatorProps={{style: {backgroundColor: "#006064"}}}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example" >
          <Tab label="Manueller Fahrauftrag" icon={<ColorLensIcon />} {...a11yProps(2)} />
          <Tab label="ERP-Fahraufträge" icon={<ArchiveIcon />} {...a11yProps(3)} />
          <Tab label="Roboterstatus" icon={<AdbIcon />} {...a11yProps(4)} />
          <Tab label="Aktive Aufträge" icon={<AssignmentTurnedInIcon />} {...a11yProps(5)} />
          <Tab label="Abgeschlosse Aufträge" icon={<AssignmentTurnedInIcon />} {...a11yProps(6)} />
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
            <ERPOrders/> 
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={2}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <Roboterstatus/> 
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
    </div>
)
}