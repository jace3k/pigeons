import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListCard from "./ListCard";

import {withStyles} from '@material-ui/core/styles';
import {fetchAuctions} from "../actions/auctionActions";
import {connect} from "react-redux";
import Loader from 'react-loader-spinner'
import {SECONDARY_COLOR} from "../constants";


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
});


class Main extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAuctions();
  }

  state = {
    xs: 12,
    auctions: []
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
    const {errors, auctions} = this.state;

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
    if (errors) {
      component = <div>{errors.auctions}</div>
    } else if (auctions.length !== 0) {
      component = auctions.map(auction => {
        return (
          <Grid item xs={this.state.xs} className={classes.griditem} key={auction.title}>
            <ListCard history={this.props.history} auction={auction}/>
          </Grid>
        );
      })
    }

    return (
      <Grid container>
        <div style={{height: '2em'}}/>
        {component}
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  auctions: state.auctions
});

export default connect(mapStateToProps, {fetchAuctions})(withStyles(styles)(Main));