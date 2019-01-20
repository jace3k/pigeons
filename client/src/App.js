import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';

import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "./components/Footer";

import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/deepPurple';
import secondary from '@material-ui/core/colors/orange';
import Auction from "./components/Auction";
import AddAuction from "./components/AddAuction";
import LastAuctions from "./components/LastAuctions";
import Archive from "./components/Archive";
import Login from "./components/Login";
import Register from "./components/Register";

const theme = createMuiTheme({
    palette: {
        primary: primary,
        secondary: secondary,
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    render() {

        return (
            <Router>
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <Redirect exact from={"/"} to={"/app"}/>
                        </Switch>
                        <Route path={"/app/"} component={Navbar}/>
                        <main style={{flex: 1}}>
                            <Route exact path={"/app"} component={Main}/>
                            <Route exact path={"/app/add"} component={AddAuction}/>
                            <Route exact path={"/app/last"} component={LastAuctions}/>
                            <Route exact path={"/app/archive"} component={Archive}/>
                            <Route exact path={"/app/auction/:id"} component={Auction}/>

                            <Route exact path={"/register"} component={Register} />
                            <Route exact path={"/login"} component={Login}/>
                        </main>
                        <footer>
                            <Route path={"/app"} component={Footer}/>
                        </footer>

                        <CssBaseline/>
                    </MuiThemeProvider>
                </div>
            </Router>

        );
    }
}

export default App;
