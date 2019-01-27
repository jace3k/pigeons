import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Star from '@material-ui/icons/Star';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {TITLE} from "../constants";
import ButtonLink from "./ButtonLink";

import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {withSnackbar} from "notistack";
import {withStyles} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import AccessibilityIcon from '@material-ui/icons/AccessibilityNew';
import ShopIcon from '@material-ui/icons/Shop';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';

const drawerItemsLoggedOut = [
  {name: 'Zaloguj', link: '/login', icon: <LockIcon/>},
  {name: 'Załóż konto', link: '/register', icon: <AccessibilityIcon/>},
  {name: 'Aukcje', link: '/', icon: <ShopIcon/>},
];

const drawerItemsLoggedIn = [
  {name: 'Profil', link: '/profile', icon: <PeopleIcon/>},
  {name: 'Wyloguj', link: 'logout', icon: <ExitToAppIcon/>},
];

const secondDrawerItemsLoggedIn = [
  {name: 'Dodaj Gołębia', link: '/add', icon: <AddIcon/>},
  {name: 'Aukcje', link: '/', icon: <ShopIcon/>},
];


const styles = theme => ({
  appbar: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'black',
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  menuicon: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  navbutton: {
    // [theme.breakpoints.down('sm')]: {
    //     display: 'none',
    // },
  },
  title: {
    margin: '0 1em',
  },
});

class Navbar extends Component {
  state = {
    anchorEl: null,
    currentTab: 'main',
    isDrawerOpen: false,
  };

  handleProfile = event => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null})
  };

  handleLogout = () => {
    this.setState({anchorEl: null});
    this.props.logoutUser();
    this.props.enqueueSnackbar('Zostałeś wylogowany.', {variant: 'warning'})
  };

  toggleDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen})
  };

  activate = (tab) => {
    this.setState({currentTab: tab})
  };

  makeListItems = (table) => table.map((item) => (
    <ListItem button key={item.name}
              onClick={() => item.link !== 'logout' ? this.props.history.push(item.link) : this.handleLogout()}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name}/>
    </ListItem>
  ));

  componentDidMount() {
    this.activate(this.props.location.pathname);
  }

  render() {
    const {anchorEl, currentTab, isDrawerOpen} = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const {isAuthenticated} = this.props.auth;
    const {classes} = this.props;

    const sideDrawer = (
      <div className={classes.list}>

        {isAuthenticated ?
          <div>
            <List>
              {this.makeListItems(drawerItemsLoggedIn)}
            </List>
            <Divider/>
            <List>
              {this.makeListItems(secondDrawerItemsLoggedIn)}
            </List>
          </div> :
          <div>
            <List>
              {this.makeListItems(drawerItemsLoggedOut)}
            </List>
          </div>
        }
      </div>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profil</MenuItem>
        <MenuItem onClick={this.handleLogout}>Wyloguj</MenuItem>
      </Menu>
    );

    const authLeftSide = (
      <div>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <Star/>
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={this.handleProfile}>
          <Badge badgeContent={0} color="secondary">
            <AccountCircle/>
          </Badge>
        </IconButton>
      </div>
    );
    const guestLeftSide = (
      <div>
        <Toolbar className={classes.appbar}>
          <ButtonLink
            to={"/login"}
            active={currentTab === '/login'}
            onClick={() => this.activate("/login")}
          >
            Zaloguj
          </ButtonLink>
          <ButtonLink
            to={"/register"}
            active={currentTab === '/register'}
            onClick={() => this.activate("/register")}
          >
            Załóż konto
          </ButtonLink>
        </Toolbar>
      </div>
    );

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.menuicon} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              {TITLE}
            </Typography>
            <Toolbar className={classes.appbar}>
              <ButtonLink
                to={"/"}
                active={currentTab === '/'}
                onClick={() => this.activate("/")}
              >
                Aukcje
              </ButtonLink>
              {isAuthenticated &&
              <ButtonLink
                to={"/add"}
                active={currentTab === '/add'}
                onClick={() => this.activate("/add")}
              >
                Dodaj gołębia
              </ButtonLink>
              }
            </Toolbar>
            <div style={{flexGrow: '1'}}/>

            {isAuthenticated ? authLeftSide : guestLeftSide}

          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer open={isDrawerOpen} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {sideDrawer}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(withSnackbar(Navbar)));