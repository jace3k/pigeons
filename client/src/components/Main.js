import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListCard from "./ListCard";
import Card from '@material-ui/core/Card';

import {withStyles} from '@material-ui/core/styles';
import {fetchAuctions} from "../actions/auctionActions";
import {connect} from "react-redux";
import Loader from './Loader'
import {SECONDARY_COLOR} from "../constants";
import AuctionList from "./AuctionList";


const styles = theme => ({
  griditem: {
    padding: '0.3em',
    margin: '0 5em',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      minWidth: '300px',
      padding: 0,
      paddingBottom: '0.3em'
    },
    [theme.breakpoints.up('xl')]: {
      margin: '0 25em',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    padding: '2em',
    margin: '2em',
    display: 'flex',
    justifyContent: 'center',
  }
});


class Main extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAuctions();
  }

  state = {
    xs: 12,
    auctions: null,
  };


  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auctions) {
      if (nextProps.auctions.error) {
        this.setState({errors: nextProps.auctions.error})
      } else {
        this.setState({auctions: nextProps.auctions.all.rows})
      }
    }
  }

  render() {
    const {classes} = this.props;
    const {auctions} = this.state;

    let component = <Loader />;

    if (auctions) {
      if (auctions.length === 0) {
        component = <Card className={classes.card}>Brak aukcji!</Card>;
      } else {
        component = <AuctionList auctions={auctions} history={this.props.history} showFilter={true} />
      }
    }
    return component;
  }
}


const mapStateToProps = state => ({
  auctions: state.auctions
});

export default connect(mapStateToProps, {fetchAuctions})(withStyles(styles)(Main));