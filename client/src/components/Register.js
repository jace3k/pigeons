import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ButtonLink from './ButtonLink';

import {Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {registerUser} from "../actions/authActions";

import {
    LOGIN_ELEMENT,
    TITLE,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../constants";

import axios from 'axios';
import {withSnackbar} from "notistack";

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {},
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // console.log(user);


        this.props.registerUser(user);


    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        if (nextProps.auth) {
            if (nextProps.auth.registerSuccess) {
                this.setState({registerSuccess: true})
            }
        }
    }

    render() {
        const {errors, registerSuccess} = this.state;
        const {isAuthenticated} = this.props.auth;
        if (registerSuccess) {
            this.props.enqueueSnackbar('Konto utworzone pomyślnie. Możesz się teraz zalogować.', {variant: 'success'})
        } else if (isAuthenticated) {
            this.props.enqueueSnackbar('Masz już konto.', {variant: 'error'})
        }
        return (
            <div>
                {registerSuccess || isAuthenticated && <Redirect to={"/"}/>}
                <Card className={"card"}>
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        <CardContent className={"card-content"}>
                            <Avatar
                                style={{
                                    width: 60,
                                    height: 60,
                                    margin: '0 auto',
                                    backgroundColor: SECONDARY_COLOR
                                }}>
                                <Lock/>
                            </Avatar>
                            <Typography
                                variant="h4"
                                component="h2"
                                style={{
                                    marginTop: '0.5em',
                                    marginBottom: '1.4em'
                                }}>
                                {'Rejestracja'}
                            </Typography>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <TextField
                                        id={"name"}
                                        label={"Nazwa użytkownika"}
                                        name={"name"}
                                        onChange={this.handleChange('name')}
                                        className={"width-100"}
                                        value={this.state.name}
                                        helperText={errors.name && errors.name}
                                        error={errors.name && true}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={"email"}
                                        label={"E-mail"}
                                        name={"email"}
                                        onChange={this.handleChange('email')}
                                        className={"width-100"}
                                        value={this.state.email}
                                        helperText={errors.email && errors.email}
                                        error={errors.email && true}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={"password"}
                                        label={"Hasło"}
                                        name={"password"}
                                        onChange={this.handleChange('password')}
                                        type="password"
                                        className={"width-100"}
                                        value={this.state.password}
                                        helperText={errors.password && errors.password}
                                        error={errors.password && true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={"password2"}
                                        label={"Powtórz hasło"}
                                        name={"password2"}
                                        onChange={this.handleChange('password2')}
                                        type="password"
                                        className={"width-100"}
                                        value={this.state.password2}
                                        helperText={errors.password2 && errors.password2}
                                        error={errors.password2 && true}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider/>
                        <CardActions>
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                className={"width-100"}
                            >
                                {'Utwórz konto'}
                            </Button>

                            <ButtonLink
                                to={"/app"}
                            >
                                Wróć
                            </ButtonLink>

                        </CardActions>
                    </form>
                </Card>

                {LOGIN_ELEMENT}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withSnackbar(Register));