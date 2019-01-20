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

class Navbar extends Component {
    state = {
        anchorEl: null,
        currentTab: 'main'
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


    activate = (tab) => {
        this.setState({currentTab: tab})
    };

    render() {
        const {anchorEl, currentTab} = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const {isAuthenticated} = this.props.auth;
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
                <Toolbar>
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
                        <Typography variant="h6" color="inherit" style={{marginRight: '2em'}}>
                            {TITLE}
                        </Typography>
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


                        <div style={{flexGrow: '1'}}/>
                        {isAuthenticated ? authLeftSide : guestLeftSide}
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withSnackbar(Navbar));