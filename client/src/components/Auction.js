import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import img from '../img/background.jpg';
import {SECONDARY_COLOR} from "../constants";
import {connect} from "react-redux";
import {fetchAuctionDetails} from '../actions/auctionActions'
import Loader from 'react-loader-spinner'
import ImageGallery from 'react-image-gallery';
import Grid from '@material-ui/core/Grid';

import "react-image-gallery/styles/css/image-gallery.css";
import Divider from "@material-ui/core/es/Divider/Divider";

import Countdown from 'react-countdown-now';
import Button from "@material-ui/core/es/Button/Button";


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
      padding: '0.3em'
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
      alignItems: 'center',
    }

  },
  gallery: {
    flexGrow: '1',
    maxWidth: '50%',
    padding: '0.3em',
    [theme.breakpoints.down('sm')]: {
      padding: '0.3em',
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
});


class Auction extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAuctionDetails(this.props.match.params.id);
  }

  state = {
    error: null,
    auction: null,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auctions) {
      this.setState({
        auction: nextProps.auctions.current,
        error: nextProps.auctions.error,
      })
    }
  }

  render() {
    const {auction, error} = this.state;
    const {classes} = this.props;
    let btnBack = (
      <Button
        variant={"outlined"}
        className={classes.topcarditem}
        onClick={() => this.props.history.push('/')}
      >Wróć</Button>
    );

    let btnObserve = (
      <Button
        variant={"outlined"}
        className={classes.topcarditem}
        onClick={()=> alert('obserwowanie!')}
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
            {btnObserve}
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

                <Typography variant={"h6"}>
                  Sprzedawca: {auction.owner.name}
                </Typography>
                <Typography>
                  <span className={classes.bold}>{'Kontakt: '}</span> 500 323 222
                </Typography>
                <Typography>
                  <span className={classes.bold}>{'Lajki: '}</span> 10
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
                {auction.description}
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
});

export default connect(mapStateToProps, {fetchAuctionDetails})(withStyles(styles)(Auction));