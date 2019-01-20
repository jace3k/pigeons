import React, {Component} from 'react';
import {PRIMARY_COLOR, TITLE} from "../constants";

class Footer extends Component {
    render() {
        const styles = {
            height: '3em',
            backgroundColor: PRIMARY_COLOR,
            color: 'white',
            padding: '1em',
            boxShadow: '0 -2px 8px 1px #888888',


        };
        return (
            <div style={styles}>
                &copy; {(new Date()).getFullYear()} {TITLE}.
            </div>
        );
    }
}

export default Footer;