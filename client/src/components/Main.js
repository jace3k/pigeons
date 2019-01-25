import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListCard from "./ListCard";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    griditem: {
        padding: '0.3em',
        margin: '0 3em',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            minWidth: '300px',
            padding: 0,
            paddingBottom: '0.3em'
        },

    }
})


class Main extends Component {
    state = {
        xs: 12,
        auctions: [
            {
                id: 1,
                title: 'Auction 1 blah blah',
                subtitle: 'This is auction 1',
                price: 100.30,
            },
            {
                id: 2,
                title: 'Auction 2',
                subtitle: 'This is auction 2 sadasdsaads',
                price: 1000.30,
            },
            {
                id: 3,
                title: 'Auction 3',
                subtitle: 'This is auction 3',
                price: 333.33
            },
        ]
    }
    render() {
        const {classes} = this.props;

        return (
            <div style={{flexGrow: '1'}}>
                <Grid container spacing={0}>
                {this.state.auctions.map(auction => (
                    <Grid item xs={this.state.xs} className={classes.griditem} key={auction.title}>
                        <ListCard auction={auction} />
                    </Grid>
                ))}
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(Main);