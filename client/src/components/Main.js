import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListCard from "./ListCard";


class Main extends Component {
    render() {
        const gridItemStyle = {
            padding: '1em'
        };

        return (
            <div style={{flexGrow: '1'}}>
                <Grid container spacing={0} style={{marginTop: '1em'}}>
                    <Grid item xs={4} style={gridItemStyle}>
                        <ListCard/>
                    </Grid>

                    <Grid item xs={4} style={gridItemStyle}>
                        <ListCard/>
                    </Grid>

                    <Grid item xs={4} style={gridItemStyle}>
                        <ListCard/>
                    </Grid>

                    <Grid item xs={4} style={gridItemStyle}>
                        <ListCard/>
                    </Grid>

                </Grid>

            </div>
        );
    }
}

export default Main;