import React from 'react';
import Loader from "react-loader-spinner";
import {SECONDARY_COLOR} from "../constants";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

export default withStyles(styles)((props) => (
  <div className={props.classes.loader}>
    <Loader
      type="Plane"
      color={SECONDARY_COLOR}
      height="100"
      width="100"
    />
  </div>
));