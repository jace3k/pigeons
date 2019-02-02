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
import {registerUser, clearRegister, clearErrors} from "../actions/authActions";

import {withStyles} from '@material-ui/core/styles';

import {
  LOGIN_ELEMENT,
  SECONDARY_COLOR
} from "../constants";

import {withSnackbar} from "notistack";

const styles = theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {}
  },
  card: {
    width: '25em',
    margin: '1em auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      marginBottom: '1em',
    },
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.props.clearRegister();
    this.props.clearErrors();
  }
  state = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    telephone: '',
    address: '',
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      telephone: this.state.telephone,
      address: this.state.address,
    };

    this.props.registerUser(user);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
    if (nextProps.auth) {
      if (nextProps.auth.registerSuccess) {
        if (nextProps.auth.registerSuccess) {
          this.props.enqueueSnackbar('Konto utworzone pomyślnie. Możesz się teraz zalogować.', {variant: 'success'})
        } else if (nextProps.auth.isAuthenticated) {
          this.props.enqueueSnackbar('Masz już konto.', {variant: 'error'})
        }

      }
    }
  }

  render() {
    const {errors, registerSuccess} = this.state;
    const {isAuthenticated} = this.props.auth;
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        {(registerSuccess || isAuthenticated) && <Redirect to={"/"}/>}
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
                {'Rejestracja'}
              </Typography>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <TextField
                    id={"firstName"}
                    label={"Imię"}
                    name={"firstName"}
                    onChange={this.handleChange('firstName')}
                    className={"width-100"}
                    value={this.state.firstName}
                    helperText={errors.firstName && errors.firstName}
                    error={errors.firstName && true}

                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"lastName"}
                    label={"Nazwisko"}
                    name={"lastName"}
                    onChange={this.handleChange('lastName')}
                    className={"width-100"}
                    value={this.state.lastName}
                    helperText={errors.lastName && errors.lastName}
                    error={errors.lastName && true}

                  />
                </Grid>
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
                <Grid item xs={12}>
                  <TextField
                    id={"telephone"}
                    label={"Numer telefonu"}
                    name={"telephone"}
                    onChange={this.handleChange('telephone')}
                    className={"width-100"}
                    value={this.state.telephone}
                    helperText={errors.telephone && errors.telephone}
                    error={errors.telephone && true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id={"address"}
                    label={"Adres"}
                    name={"address"}
                    onChange={this.handleChange('address')}
                    type="textarea"
                    className={"width-100"}
                    value={this.state.address}
                    helperText={errors.address && errors.address}
                    error={errors.address && true}
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

export default connect(mapStateToProps, {
  registerUser,
  clearRegister,
  clearErrors
})(withSnackbar(withStyles(styles)(Register)));