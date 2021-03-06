import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListCard from "./ListCard";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  gridItem: {
    padding: '0.3em',
    margin: '0 auto',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: '0.1em 0.3em',
      minWidth: '300px',
      padding: 0,
      paddingBottom: '0.3em'
    },
    [theme.breakpoints.up('xl')]: {
      margin: '0 25em',
    },
  },
  card: {
    padding: '0.3em',
    margin: '2em auto',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: '0.4em 0',
      padding: 0,
    },
    [theme.breakpoints.up('xl')]: {
      margin: '1em 25em',
    },
  },
  filterArea: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  filterCard: {
    [theme.breakpoints.down('sm')]: {
      // borderBottom: `2px solid ${SECONDARY_COLOR}`,
      margin: '0.1em 0.3em'
    }
  }
});

class AuctionList extends Component {
  state = {
    nameFilter: '',
    priceMin: '',
    priceMax: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

  };


  render() {
    const {classes, showFilter} = this.props;
    return (
      <>
      <Grid container>
        { showFilter &&
          <Grid item xs={12} className={classes.card} key={"filter"}>
            <Card className={classes.filterCard}>
              <div style={{padding: '1em'}}>
                <form onSubmit={this.onSubmit}>
                  <div className={classes.filterArea}>
                    <div style={{flexGrow: '16', paddingRight: '1em'}}>
                      <TextField
                        id={"nameFilter"}
                        label={"Wyszukaj"}
                        name={"nameFilter"}
                        onChange={this.handleChange('nameFilter')}
                        className={"width-100"}
                        value={this.state.nameFilter}
                      />
                    </div>

                    <div style={{flexGrow: '2', paddingRight: '1em'}}>
                      <TextField
                        id={"priceMin"}
                        label={"Cena od"}
                        name={"priceMin"}
                        type={"number"}
                        onChange={this.handleChange('priceMin')}
                        className={"width-100"}
                        value={this.state.priceMin}
                      />
                    </div>
                    <div style={{flexGrow: '2', paddingRight: '1em'}}>
                      <TextField
                        id={"priceMax"}
                        label={"Cena do"}
                        name={"priceMax"}
                        type={"number"}
                        onChange={this.handleChange('priceMax')}
                        className={"width-100"}
                        value={this.state.priceMax}
                      />
                    </div>

                    <div style={{flexGrow: '2', paddingRight: '1em', marginTop: '0.3em'}}>
                      <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={()=> {
                          this.setState({
                            nameFilter: '',
                            priceMin: '',
                            priceMax: '',
                          })
                        }}
                      >Wyczyść</Button>
                    </div>

                  </div>
                </form>
              </div>
            </Card>
          </Grid>
        }
        {this.props.auctions.map(auction => {
          let ended = false;

          if(!this.props.hideEnded) {
            if (new Date(auction.endDate) < Date.now()) {
              ended = true;
            }
          } else {
            if (new Date(auction.endDate) < Date.now()) {
              return null;
            }
          }


          let component = (
            <Grid item xs={12} className={classes.gridItem} key={auction.ring + auction.endDate}>
              <ListCard history={this.props.history} auction={auction} ended={ended} />
            </Grid>
          );

          if ((this.state.nameFilter !== '' && !auction.race.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
           && (this.state.nameFilter !== '' && !auction.ring.toLowerCase().includes(this.state.nameFilter.toLowerCase()))) {
            component = null;
          }

          if (this.state.priceMin !== '' && Number(auction.currentPrice) < Number(this.state.priceMin)) {
            component = null;
          }

          if (this.state.priceMax !== '' && Number(auction.currentPrice) > Number(this.state.priceMax)) {
            component = null;
          }

          return component;
        })}

      </Grid>
      </>
    );
  }
}

export default withStyles(styles)(AuctionList);