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
import ButtonLink from "./ButtonLink";
import {loginUser} from "../actions/authActions";

import {
    LOGIN_ELEMENT,
    SECONDARY_COLOR
} from "../constants";

import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import {Redirect} from "react-router-dom";

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {}
    },
    card: {
        width: '25em',
        margin: '5em auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
            marginBottom: '1em',
        },
    }
});


class Login extends Component {
    state = {
        name: '',
        password: '',
        errors: {},
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            errors: {
                ...this.state.errors,
                [name]: null
            }
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            password: this.state.password
        };
        this.props.loginUser(user);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        if (nextProps.auth.isAuthenticated) {
            this.props.enqueueSnackbar('Zalogowano pomyślnie.', { variant: 'success' })
        }
    }

    render() {
        const {errors} = this.state;
        const { isAuthenticated } = this.props.auth;
        const { classes } = this.props;

        return (
            <div>
                {isAuthenticated && <Redirect to={"/"}/>}
                <Card className={classes.card}>
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
                                {'Logowanie'}
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
                                {'Zaloguj'}
                            </Button>
                            <ButtonLink
                                to={"/"}
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

export default connect(mapStateToProps, {loginUser})(withSnackbar(withStyles(styles)(Login)));