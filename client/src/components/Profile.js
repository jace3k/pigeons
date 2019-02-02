import React, {Component} from 'react';
import {fetchUserDetails} from "../actions/userActions";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import {SECONDARY_COLOR} from "../constants";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";

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
    this.props.fetchUserDetails(this.props.match.params.name);
  }

  render() {
    const {classes} = this.props;
    let component = (
      <div className={classes.loader}>
        <Loader
          type="Plane"
          color={SECONDARY_COLOR}
          height="100"
          width="100"
        />
      </div>
    );

    if (this.props.user) {
      const {id, name, firstName, lastName, email, address, telephone, date, likes, dislikes} = this.props.user;
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
            </Typography>
            <Divider/>
            <div>
              <ul>
                <li>Nazwa użytkownika: {name},</li>
                <li>Email: {email},</li>
                <li>Telefon: {telephone},</li>
                <li>Adres zamieszkania: {address},</li>
                <li>Pozytywy: {likes.length},</li>
                <li>Negatywy: {dislikes.length},</li>
                <li>Data dołączenia: {date},</li>
              </ul>
            </div>
          </Card>
          <Card className={classes.card}>
            <Typography variant={"h5"}>
              Twoje aukcje
            </Typography>
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
  errors: state.users.error,
  auth: state.auth,
});

export default connect(mapStateToProps, {fetchUserDetails})(withStyles(styles)(Profile));