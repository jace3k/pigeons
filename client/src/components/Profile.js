import React, {Component} from 'react';
import {fetchUserDetails, fetchUserAuctions} from "../actions/userActions";
import {logoutUser} from "../actions/authActions";
import {updateUser} from "../actions/authActions";
import {connect} from "react-redux";
import Loader from "./Loader";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AuctionList from "./AuctionList";

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
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.props.fetchUserDetails(nextProps.match.params.name)
    }
    if (nextProps.user) {
      this.setState({
        user: nextProps.user,
      });
      this.props.fetchUserAuctions(nextProps.user.id);
    }

    if (nextProps.userAuctions) {
      this.setState({
        userAuctions: nextProps.userAuctions.rows
      })
    }
  }

  render() {
    const {classes} = this.props;
    const {userAuctions, user} = this.state;
    let component = <Loader />;
    let userAuctionsComponent = <Loader />;

    if (this.state.user && this.props.userAuctions) {
      userAuctionsComponent = <AuctionList auctions={userAuctions} showFilter={false} history={this.props.history} />;
      const { name, firstName, lastName, email, address, telephone, date, likes, dislikes} = user;
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
              {this.props.auth.user.id === user.id
                ?
                <ul>EDYTOWALNY BĘDZIE
                  <li>Nazwa użytkownika: {name},</li>
                  <li>Email: {email},</li>
                  <li>Telefon: {telephone},</li>
                  <li>Adres zamieszkania: {address},</li>
                  <li>Pozytywy: {likes.length},</li>
                  <li>Negatywy: {dislikes.length},</li>
                  <li>Data dołączenia: {date},</li>
                </ul>
                :
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
            <div style={{marginBottom: '0.3em'}} />
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
  userAuctions: state.users.userAuctions,
  errors: state.users.error,
  auth: state.auth,
});

export default connect(mapStateToProps, {fetchUserDetails, fetchUserAuctions, updateUser, logoutUser})(withStyles(styles)(Profile));