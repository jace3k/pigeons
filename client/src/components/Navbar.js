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
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import MenuIcon from '@material-ui/icons/Menu';

import { isMobile, isBrowser } from 'react-device-detect';

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
    }

    activate = (tab) => {
        this.setState({currentTab: tab})
    };

    render() {
        const {anchorEl, currentTab, isDrawerOpen} = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const {isAuthenticated} = this.props.auth;
        const {classes} = this.props;
        
        const sideDrawer = (
            <div className={classes.list}>
                <List>
                    {['Zaloguj', 'Załóż konto', 'Aukcje'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {isAuthenticated &&
                    <List>
                        {['Dodaj gołębia'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                }
            </div>
        )
        
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
                        active
                        onClick={() => null}
                    >
                        Zaloguj
                    </ButtonLink>
                    <ButtonLink
                        to={"/register"}
                        active={false}
                        onClick={() => null}
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
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            {TITLE}
                        </Typography>
                        <Toolbar className={classes.appbar}>
                            <ButtonLink
                                to={"/app"}
                                active={currentTab === 'main'}
                                onClick={() => this.activate("main")}
                            >
                                Aukcje
                            </ButtonLink>
                            {isAuthenticated &&
                            <ButtonLink 
                                to={"/app/add"}
                                active={currentTab === 'add'}
                                onClick={() => this.activate("add")}
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