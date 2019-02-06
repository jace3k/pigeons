import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import img from '../img/background.jpg';
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../constants";
import {connect} from "react-redux";
import {fetchAuctionDetails} from '../actions/auctionActions'
import {clearLikes, dislikeUser, likeUser} from "../actions/userActions";
import Loader from 'react-loader-spinner'
import ImageGallery from 'react-image-gallery';
import Grid from '@material-ui/core/Grid';

import "react-image-gallery/styles/css/image-gallery.css";
import Divider from "@material-ui/core/es/Divider/Divider";

import Countdown from 'react-countdown-now';
import Button from "@material-ui/core/es/Button/Button";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import {withSnackbar} from "notistack";

import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  container: {
    width: '100%',
    margin: '2em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.3em',
    }
  },
  card: {
    padding: '2em',
    margin: '2em auto',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: 0,
    }
  },
  topcard: {
    padding: '0.6em',
    margin: '2em auto',
    maxWidth: '80%',
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: '0.3em'
    }
  },
  topcarditem: {
    margin: '0.3em',
  },
  flexContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'left',
      margin: 0,
      padding: 0,
    }

  },
  gallery: {
    flexGrow: '1',
    maxWidth: '50%',
    padding: '0.3em',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      maxWidth: '100%'
    }
  },
  description: {
    flexGrow: '1',
    padding: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0.3em',
    }
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 600,
  },
  greencolor: {
    color: 'green',
  },
  redcolor: {
    color: 'red',
  },
});

class Auction extends Component {
  constructor(props) {
    super(props);
    this.props.clearLikes();
    this.props.fetchAuctionDetails(this.props.match.params.id);
  }

  state = {
    error: null,
    auction: null,
    like: null,
    dislike: null,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auctions) {
      this.setState({
        auction: nextProps.auctions.current,
        error: nextProps.auctions.error,
      })
    }

    if (nextProps.users) {
      if (nextProps.users.like && nextProps.users.like > 0) {
        // zalajkowano
        this.props.enqueueSnackbar(
          `Polubiono sprzedawcę ${nextProps.auctions.current.owner.name}`,
          {variant: 'success'});
      }

      if (nextProps.users.like && nextProps.users.like < 0) {
        // cofnieto lajka
        this.props.enqueueSnackbar(
          `Cofnięto polubienie ${nextProps.auctions.current.owner.name}`,
          {variant: 'success'});
      }

      if (nextProps.users.dislike && nextProps.users.dislike > 0) {
        // znienawidzono
        this.props.enqueueSnackbar(
          `Znienawidzono sprzedawcę ${nextProps.auctions.current.owner.name}`,
          {variant: 'error'});
      }

      if (nextProps.users.dislike && nextProps.users.dislike < 0) {
        // cofnieto znienawidzenie
        this.props.enqueueSnackbar(
          `Cofnięto znienawidzenie ${nextProps.auctions.current.owner.name}`,
          {variant: 'success'});

      }
      this.setState({
        like: nextProps.users.like,
        dislike: nextProps.users.dislike,
      })
    }
  }

  render() {
    const {auction, error, like, dislike} = this.state;
    const {classes} = this.props;
    console.log('state', this.state);

    if (like) {
      auction.owner.likes += like;
    }

    if (dislike) {
      auction.owner.dislikes += dislike;
    }

    let btnBack = (
      <Button
        // variant={"outlined"}
        color={"secondary"}
        className={classes.topcarditem}
        onClick={() => this.props.history.push('/')}
      >Wróć</Button>
    );

    let btnObserve = (
      <Button
        // variant={"outlined"}
        color={"secondary"}
        className={classes.topcarditem}
        onClick={() => alert('obserwowanie!')}
      >Obserwuj</Button>
    );

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
    if (error) {
      if (error.auction) {
        component = <Card className={classes.card}>{error.auction}{' '}{btnBack}</Card>;
      } else {
        component = 'unknown error'
      }
    } else if (auction) {
      component = (
        <div>
          <Card className={classes.topcard}>
            {btnBack}
            {this.props.auth.isAuthenticated && btnObserve}
          </Card>
          <Card className={classes.card}>
            <div className={classes.flexContainer}>
              <div className={classes.gallery}>
                <ImageGallery items={[
                  {
                    original: img,
                    thumbnail: img,
                  }
                ]}/>
              </div>
              <div className={classes.description}>
                <Typography variant={"h3"}>
                  {auction.title}
                </Typography>
                <Tooltip title={"Numer obrączki"} placement={"right"}>
                <Typography variant={"h4"}>
                  {auction.ring}
                </Typography>
                </Tooltip>


                {/*<div style={{marginBottom: '1em'}} />*/}
                <Typography variant={"h6"}>
                  Hodowca:{' '}
                  <Button
                    variant={"text"}

                    // style={{
                    //   backgroundColor: PRIMARY_COLOR,
                    //   color: 'white',
                    //   padding: '0.3em',
                    //   borderRadius: '6px 6px 6px',
                    //   cursor: 'pointer',
                    // }}
                    onClick={() => this.props.history.push(`/profile/${auction.owner.name}`)}>
                    {auction.owner.name}
                  </Button>
                </Typography>
                <Typography>
                  <span className={classes.bold}>{'Kontakt: '}</span> {auction.owner.telephone}
                </Typography>
                <Typography>
                  <span className={[classes.bold, classes.greencolor].join(' ')}>
                    <IconButton disabled={!this.props.auth.isAuthenticated} onClick={() => {
                      this.props.likeUser(auction.owner.name)
                    }}>
                    <Badge badgeContent={auction.owner.likes} color={"secondary"}>
                      <ThumbUp/>
                    </Badge>
                    </IconButton>
                  </span>
                  {' '}
                  <span className={[classes.bold, classes.redcolor].join(' ')}>
                    <IconButton disabled={!this.props.auth.isAuthenticated} onClick={() => {
                      this.props.dislikeUser(auction.owner.name);
                    }}>
                      <Badge badgeContent={auction.owner.dislikes} color={"error"}>
                      <ThumbDown/>
                      </Badge>
                    </IconButton>
                  </span>
                </Typography>
                <Typography>
                  <span className={classes.bold}>{'Wyświetlenia: '}</span> {auction.viewsCount}
                </Typography>
                <Divider/>
                <Typography>
                  <span className={classes.bold}>{'Do końca: '}</span>
                  <Countdown date={auction.endDate} renderer={(props) => {
                    if (props.completed) {
                      return 'Zakończono!'
                    } else {
                      return (
                        <span>{props.days} dni, {props.hours} godzin, {props.minutes} minut, {props.seconds} sekund.</span>
                      )
                    }
                  }}/>
                </Typography>
                <div style={{marginTop: '4em'}}/>
                <Typography variant={"h4"} style={{fontWeight: '600', color: SECONDARY_COLOR}}>
                  {auction.price}{' zł'}
                </Typography>
                <div style={{marginTop: '3em'}}/>

              </div>
            </div>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant={"h6"}>
                  Opis
                </Typography>
                <Divider style={{marginBottom: '1em'}}/>

                <b>Rasa:</b> {auction.race}
                <br />
                <b>Płeć:</b> {auction.sex}

                <Divider style={{margin: '1em 0'}}/>
                {auction.description}

                <Divider style={{marginTop: '1em'}}/>
              </Grid>

            </Grid>
          </Card>
        </div>
      );
    }

    return (
      <div style={{width: '100%'}}>
        {component}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  auctions: state.auctions,
  users: state.users,
});

export default connect(mapStateToProps, {
  fetchAuctionDetails,
  likeUser,
  dislikeUser,
  clearLikes,
})(withSnackbar(withStyles(styles)(Auction)));