import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

import img from '../img/background.jpg';
import {SECONDARY_COLOR} from "../constants";

const styles = theme => ({
  card: {
    // border: `3px solid ${SECONDARY_COLOR}`
  },
  ended: {
    opacity: '0.5',
  },
  cardactionarea: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    // border: '1px dashed red',
  },
  imagecontainer: {},
  image: {
    width: 200,
    height: 140,
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      width: 100,
      minWidth: 100,
      height: 160,
    }
  },
  titlearea: {
    flexBasis: '100%',
    // border: '1px dashed black',
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      // flexBasis: '100%',
    },
  },
  pricearea: {
    flexBasis: '20em',
    borderLeft: `3px solid ${SECONDARY_COLOR}`,
    // border: '1px dashed black',
    padding: theme.spacing.unit,
    paddingTop: '2em',
    [theme.breakpoints.down('sm')]: {

      flexBasis: '0',
      paddingTop: theme.spacing.unit,
      borderLeft: '0',
      borderTop: `3px solid ${SECONDARY_COLOR}`,
    }
  },

  details: {
    width: '100%',
    // height: '100%',
    display: 'flex',
    justifyItems: 'space-between',
    flexDirection: 'row',
    // border: '1px dashed black',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    }
  },
  typoprice: {}
});

class MediaControlCard extends Component {
  render() {
    const {classes, auction} = this.props;

    return (
      <Card className={this.props.ended ? classes.ended : classes.card}>
        <CardActionArea className={classes.cardactionarea}
                        onClick={() => this.props.history.push(`/auction/${auction.id}`)}>
          <div className={classes.imagecontainer}>
            <CardMedia
              className={classes.image}
              image={auction.images[0] ? auction.images[0] : img}
              title="Img"
            />
          </div>
          <div className={classes.details}>
            <div className={classes.titlearea}>
              <Typography variant="h6">
                {auction.ring}{' '}{this.props.ended && "- KONIEC AUKCJI"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {auction.race}
              </Typography>
            </div>
            <div className={classes.pricearea}>
              <Typography variant="overline" noWrap>
                Cena
              </Typography>
              <Typography variant="h6" className={classes.typoprice}>
                {auction.currentPrice}{' zł'}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles, {withTheme: true})(MediaControlCard);