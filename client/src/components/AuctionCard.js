import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "./Auction";

const styles = theme => ({
  card: {
    display: 'flex',

  },
  gallery: {},
  description: {}
});


class AuctionCard extends Component {
  render() {
    const {classes, auction} = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.gallery}>
            Gallery here
          </div>
          <div className={classes.description}>
            Desc here
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AuctionCard);