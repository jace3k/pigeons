import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/es/Typography/Typography";

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import {createAuction} from "../actions/auctionActions";
import {withSnackbar} from "notistack";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  card: {
    padding: '2em',
    margin: '2em auto',
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: '0.3em'
    }
  },
  topcard: {
    padding: '0.6em',
    margin: '2em auto',
    maxWidth: '80%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: '0.3em'
    }
  },
  topcarditem: {
    margin: '0.3em',
  },
  cardtitle: {
    display: 'flex',
    justifyContent: 'center',
  },
  textfield: {
    width: '100%',
    margin: '1em 0'
  },
  textfieldsmall: {
    // width: '100%',
    margin: '1em 0',
    marginRight: '2em',
    minWidth: 120,
  },
  enddate: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class AddAuction extends Component {
  state = {
    // title: '',
    description: '',
    ring: '',
    price: '',
    endDate: 7,
    sex: '',
    race: '',
    images: [],
    errors: {},

    labelWidth: 0,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const auctionData = {
      // title: this.state.title,
      description: this.state.description,
      ring: this.state.ring,
      price: this.state.price,
      endDate: this.state.endDate,
      sex: this.state.sex,
      race: this.state.race,
      images: this.state.images,
    };

    this.props.createAuction(auctionData)
    /// post action adding auction
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auctions.newAuction) {
      this.props.enqueueSnackbar(
        `Utworzono aukcję!`,
        {variant: 'success'});
      this.props.history.push(`/auction/${nextProps.auctions.newAuction.id}`)
    }
    if (nextProps.auctions.error) {
      this.setState({errors: nextProps.auctions.error})
    }
  }

  render() {
    const {errors} = this.state;
    const {isAuthenticated} = this.props.auth;
    const {classes} = this.props;

    return (
      <div>
        {!isAuthenticated && <Redirect to={'/'}/>}
        <Card className={classes.card}>
          <div className={classes.cardtitle}>
            <Typography variant={"h4"}>
              Nowy gołąb
            </Typography>
          </div>
          <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
            {/*<TextField*/}
              {/*id={"title"}*/}
              {/*label={"Tytuł"}*/}
              {/*name={"title"}*/}
              {/*onChange={this.handleChange('title')}*/}
              {/*variant={"outlined"}*/}
              {/*value={this.state.title}*/}
              {/*helperText={errors.title && errors.title}*/}
              {/*error={errors.title && true}*/}
              {/*className={classes.textfield}*/}
            {/*/>*/}

            <TextField
              id={"ring"}
              label={"Numer obrączki"}
              name={"ring"}
              onChange={this.handleChange('ring')}
              variant={"outlined"}
              value={this.state.ring}
              helperText={errors.ring && errors.ring}
              error={errors.ring && true}
              className={classes.textfield}
            />

            <TextField
              id={"description"}
              label={"Opis"}
              name={"description"}
              onChange={this.handleChange('description')}
              variant={"outlined"}
              value={this.state.description}
              helperText={errors.description && errors.description}
              error={errors.description && true}
              className={classes.textfield}
              multiline
            />

            <TextField
              id={"race"}
              label={"Rasa"}
              name={"race"}
              onChange={this.handleChange('race')}
              variant={"outlined"}
              value={this.state.race}
              helperText={errors.race && errors.race}
              error={errors.race && true}
              className={classes.textfield}
            />

            <TextField
              id={"price"}
              label={"Cena"}
              name={"price"}
              onChange={this.handleChange('price')}
              variant={"outlined"}
              value={this.state.price}
              helperText={errors.price && errors.price}
              error={errors.price && true}
              className={classes.textfieldsmall}
              InputProps={{
                startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
              }}
            />

            <FormControl variant="outlined" className={classes.textfieldsmall}>
              <InputLabel
                ref={ref => this.InputLabelRef = ref}>
                Czas
              </InputLabel>
              <Select
                value={this.state.endDate}
                onChange={this.handleChange('endDate')}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="endDate"
                    id="endDate"
                    error={errors.endDate && true} />
                }>
                <MenuItem value={1}>1 dzień</MenuItem>
                <MenuItem value={2}>2 dni</MenuItem>
                <MenuItem value={4}>4 dni</MenuItem>
                <MenuItem value={7}>7 dni</MenuItem>
                <MenuItem value={14}>14 dni</MenuItem>
                <MenuItem value={31}>31 dni</MenuItem>
              </Select>
              <FormHelperText error={true}>{errors.endDate && errors.endDate}</FormHelperText>
            </FormControl>

            <FormControl variant="outlined" className={classes.textfieldsmall}>
              <InputLabel>
                Płeć
              </InputLabel>
              <Select
                value={this.state.sex}
                onChange={this.handleChange('sex')}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="sex"
                    id="sex"
                    error={errors.sex && true}/>
                }>
                <MenuItem value={"Samiec"}>Samiec</MenuItem>
                <MenuItem value={"Samica"}>Samica</MenuItem>
              </Select>
              <FormHelperText error={true}>{errors.sex && errors.sex}</FormHelperText>
            </FormControl>

            <TextField
              id={"images"}
              disabled
              label={"Zdjęcia"}
              name={"images"}
              onChange={this.handleChange('images')}
              variant={"outlined"}
              value={this.state.images}
              helperText={errors.images && errors.images}
              error={errors.images && true}
              className={classes.textfield}
              InputProps={{
                startAdornment: <InputAdornment position="start">ZDJĘCIA</InputAdornment>,
              }}
            />

            <Button
              type={"submit"}
              variant={"contained"}
              color={"primary"}
              className={"width-100"}
            >
              {'Dodaj gołębia'}
            </Button>
          </form>

        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  auctions: state.auctions,
});

export default connect(mapStateToProps, {createAuction})(withStyles(styles)(withSnackbar(AddAuction)));