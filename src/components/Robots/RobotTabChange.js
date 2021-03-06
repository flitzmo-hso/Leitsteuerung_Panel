import React from 'react';
import { Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BuildIcon from '@material-ui/icons/Build';
import Box from '@material-ui/core/Box';
import AdbIcon from '@material-ui/icons/Adb';

import RobotStates from './RobotStates';
import ManageRobots from './ManageRobots';

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
    textColor: "black",
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
          textColor="primary"
          aria-label="scrollable force tabs example" >

          <Tab label="Roboterstatus" icon={<AdbIcon style={{fill:"#e68a00"}}/>} {...a11yProps(2)} style={{color:"black"}}/>
          <Tab label="Robotsettings" icon={<BuildIcon style={{fill:"#e68a00"}}/>} {...a11yProps(3)} style={{color:"black"}}/>
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.root}>
            <Grid item xs={12}>   
            <RobotStates/>
            </Grid>
        </div> 
      </TabPanel> 
      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Grid item xs={12}>
          <ManageRobots/> 
          </Grid>
        </div>
      </TabPanel>
    </div>
)
}