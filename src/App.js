import React, {useEffect} from "react";
import clsx from 'clsx';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './footer.js';
import RedditIcon from '@material-ui/icons/Reddit'

import logo from './Flitzmo_Logo.png';

// Import Pages
import Dashboard from './components/Dashboard.js';
import Orders from './components/Orders.js';
import Robots from './components/Robots.js';
import Map from './components/Map/Map.js';
import Hilfebereich from './components/Hilfebereich.js';
import { logDOM } from "@testing-library/react";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },

  activeTab:{
    "&$selected": {
      backgroundColor: "#e68a00",
      color: "black"
    },
    "&:hover": {
      backgroundColor: "#eaeaea",
      color: "black"
    },
    "&$selected:hover": {
      backgroundColor: "#e68a00",
      color: "black"
    } 
},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    color: 'black',
    backgroundColor: '#ffffff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     
    }),
    color: 'black',
    backgroundColor: '#ffffff',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color:'#fff6e5',
    backgroundColor:'white'
  },

  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  selected: {}
}));


function App() {
  
  useEffect(() => {
    console.log("Sicherheitsprüfungs-Loop - Wenn Endlosschleife, dann in App.js prüfen.");
      
    if(window.location.href.endsWith("3000")){
      setSelectedIndex(0);
    }
    else if(window.location.href.endsWith("Orders")){

       setSelectedIndex(1);
     } 

     else if(window.location.href.endsWith("Robots")){

      setSelectedIndex(2);
     }
    else if(window.location.href.endsWith("Map")){

      setSelectedIndex(3);
    } 
    else if(window.location.href.endsWith("Helpdesk")){

      setSelectedIndex(4);
    } 
    else if(window.location.href.endsWith("Einstellungen")){

      setSelectedIndex(5);
    } 
     
    }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)};

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root} >
      <Router>
     <CssBaseline /> 
      <AppBar style={{ background: '#00334d' }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
          <Footer style={{backgroundColor: "#fff6e5"}}>
      </Footer>
        <Toolbar>
          <IconButton
            style={{color: '#fffff'}}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{fill: "#fff6e5"}}/>
          </IconButton>
          <h2 style={{ color: '#fffff'}}>Flitzmo Leitsteuerung</h2>
  
        </Toolbar>
      </AppBar>
    
     
      <Drawer 
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
              
        <div className={classes.toolbar}>

        <img height="50"  src={logo} alt="Logo"/>

          <IconButton onClick={handleDrawerClose} style={{ color: '#e68a00'}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

        </div>
        <Divider />

        <List >
        <ListItem  button component={Link} to="/" key="Dashboard" className={classes.activeTab} selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
            <ListItemIcon >
              <HomeIcon style={{fill: "#e68a00"}} />
            </ListItemIcon >
            <ListItemText primary="Home" />   
         </ListItem>
         <ListItem button component={Link} to="/Orders" key="Orders" className={classes.activeTab} selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <FolderSpecialIcon style={{fill: "#e68a00"}}/>
            </ListItemIcon>
            <ListItemText primary="Orders" />   
         </ListItem>
         <ListItem button component={Link} to="/Robots" key="Robots" className={classes.activeTab} selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <RedditIcon style={{fill: "#e68a00"}}/>
            </ListItemIcon>
            <ListItemText primary="Robots" />   
         </ListItem>
         <ListItem button component={Link} to="/Map" key="Map" className={classes.activeTab} selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <MapIcon style={{fill: "#e68a00"}}/>
            </ListItemIcon>
            <ListItemText primary="Map" />   
         </ListItem>
        </List>
        <Divider/>
        <List>
        <ListItem button component={Link} to="/Helpdesk" key="Helpdesk" className={classes.activeTab} selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4)}>
            <ListItemIcon>
              <HelpIcon style={{fill: "#e68a00"}} />
            </ListItemIcon>
            <ListItemText primary="Helpdesk" />   
         </ListItem>  
        </List>  
        <Divider />
   
      </Drawer>
   
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Switch >
            <Route exact path="/" >
              <Dashboard />
            </Route>
            <Route exact path="/Orders">
              <Orders />
            </Route>
            <Route exact path="/Robots">
              <Robots />
            </Route>
            <Route exact path="/Map">
              <Map />
            </Route>
            <Route exact path="/Helpdesk">
              <Hilfebereich />
            </Route>
            
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;