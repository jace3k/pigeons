import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

function ButtonLink(props) {
    let button = (
        <Button color="secondary" variant="contained" size="large">
            {props.children}
        </Button>
    );

    if (!props.active) {
        button = (
            <Button color="inherit" size="large" onClick={props.onClick}>
                {props.children}
            </Button>
        )
    }
    return (
        <div>
            <Link to={props.to} style={{textDecoration: 'none', color: 'inherit'}}>
                {button}
            </Link>
        </div>
    );
}

export default ButtonLink;
