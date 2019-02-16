import React, {Component} from 'react';
import {fetchUserAuctions, fetchUserDetails} from "../actions/userActions";
import {logoutUser} from "../actions/authActions";
import {updateUser} from "../actions/userActions";
import {connect} from "react-redux";
import Loader from "./Loader";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AuctionList from "./AuctionList";
import Button from "@material-ui/core/es/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {withSnackbar} from "notistack";

const styles = theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    padding: '2em',
    margin: '2em auto',
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: '1em'
    }
  },
});


class Profile extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.name) {
      this.props.fetchUserDetails(this.props.match.params.name)
    } else {
      this.props.fetchUserDetails();
    }

  }

  state = {
    user: null,
    editMode: false,
    errors: {},
    waiting: false,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.props.fetchUserDetails(nextProps.match.params.name)
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors, waiting: false})
    }

    if (nextProps.userUpdated) {
      this.props.enqueueSnackbar('Dane zaktualizoowane.', {variant: 'success'});
      this.setState({waiting: false, editMode: false})
    }

    if (nextProps.user) {
      if (!nextProps.user.password) {
        nextProps.user.password = ''
      }
      if (!nextProps.user.password2) {
        nextProps.user.password2 = ''
      }
      if (!nextProps.user.telephone) {
        nextProps.user.telephone = ''
      }
      if (!nextProps.user.address) {
        nextProps.user.address = ''
      }

      this.setState({
        user: nextProps.user,
        waiting: false,
        editMode: false,
      });
      this.props.fetchUserAuctions(nextProps.user.id);
    }

    if (nextProps.userAuctions) {
      this.setState({
        userAuctions: nextProps.userAuctions.rows
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: event.target.value,
      },
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };

  onSubmit = () => {
    // const user = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2,
    //   telephone: this.state.telephone,
    //   address: this.state.address,
    // };

    this.props.updateUser(this.state.user);
    this.setState({waiting: true})
  };

  render() {
    const {classes} = this.props;
    const {userAuctions, user, editMode, errors} = this.state;
    let component = <Loader/>;
    let userAuctionsComponent = <Loader/>;

    if (this.state.user && this.props.userAuctions) {
      userAuctionsComponent = <AuctionList auctions={userAuctions} showFilter={false} history={this.props.history}/>;
      const {name, firstName, lastName, email, address, telephone, date, likes, dislikes, password, password2} = user;
      component = (
        <div>
          <Card className={classes.card}>
            <Typography variant={"h4"}>
              {firstName}{' '}{lastName}
            </Typography>
          </Card>

          <Card className={classes.card}>
            <Typography variant={"h5"}>
              Dane profilowe
              {this.props.auth.user.id === user.id && (
                <span>
                {editMode ? <Button onClick={() => {
                      this.onSubmit();
                      this.setState({waiting: true})
                    }}>Ok</Button> :
                    <Button onClick={() => this.setState({editMode: true})}>edytuj</Button>}
                </span>
              )}

            </Typography>
            <Divider/>
            <div>
              {this.props.auth.user.id === user.id
                ?
                // you.
                <ul>
                  {editMode
                    ? (
                      // edit mode
                      <div>
                        <form>
                          <Grid container spacing={16}>
                            <Grid item xs={6}>
                              <TextField
                                id={"firstName"}
                                label={"Imię"}
                                name={"firstName"}
                                onChange={this.handleChange('firstName')}
                                className={"width-100"}
                                value={firstName}
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
                                value={lastName}
                                helperText={errors.lastName && errors.lastName}
                                error={errors.lastName && true}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id={"email"}
                                label={"Email"}
                                name={"email"}
                                onChange={this.handleChange('email')}
                                className={"width-100"}
                                value={email}
                                helperText={errors.email && errors.email}
                                error={errors.email && true}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id={"telephone"}
                                label={"Telefon"}
                                name={"telephone"}
                                onChange={this.handleChange('telephone')}
                                className={"width-100"}
                                value={telephone}
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
                                className={"width-100"}
                                value={address}
                                helperText={errors.address && errors.address}
                                error={errors.address && true}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                id={"password"}
                                label={"Nowe hasło"}
                                name={"password"}
                                onChange={this.handleChange('password')}
                                className={"width-100"}
                                value={password}
                                helperText={errors.password && errors.password}
                                error={errors.password && true}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                id={"password2"}
                                label={"Powtórz nowe hasło"}
                                name={"password2"}
                                onChange={this.handleChange('password2')}
                                className={"width-100"}
                                value={password2}
                                helperText={errors.password2 && errors.password2}
                                error={errors.password2 && true}
                              />
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                    )
                    : (
                      // normal mode
                      <div>
                        <li>Imię i nazwisko: {firstName + ' ' + lastName},</li>
                        <li>Nazwa użytkownika: {name},</li>
                        <li>Email: {email},</li>
                        <li>Telefon: {telephone},</li>
                        <li>Adres zamieszkania: {address},</li>
                        <li>Pozytywy: {likes.length},</li>
                        <li>Negatywy: {dislikes.length},</li>
                        <li>Data dołączenia: {date},</li>
                      </div>
                    )
                  }


                </ul>
                :
                // not you. other user
                <ul>
                  <li>Nazwa użytkownika: {name},</li>
                  <li>Email: {email},</li>
                  <li>Telefon: {telephone},</li>
                  <li>Adres zamieszkania: {address},</li>
                  <li>Pozytywy: {likes.length},</li>
                  <li>Negatywy: {dislikes.length},</li>
                  <li>Data dołączenia: {date},</li>
                </ul>


              }

            </div>
          </Card>
          <Card className={classes.card}>
            <Typography variant={"h5"}>
              Twoje aukcje
            </Typography>
            <div style={{marginBottom: '0.3em'}}/>
            {userAuctionsComponent}
            <Divider/>
          </Card>
          <Card className={classes.card}>
            <Typography variant={"h5"}>
              Twoje obserwowane aukcje
            </Typography>
            <Divider/>
          </Card>
        </div>
      )
    }

    return (
      <div>
        {component}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  userUpdated: state.users.updated,
  userAuctions: state.users.userAuctions,
  errors: state.users.error,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  fetchUserDetails,
  fetchUserAuctions,
  updateUser,
  logoutUser
})(withSnackbar(withStyles(styles)(Profile)));


//