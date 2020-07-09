import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import LeftPanel from './components/LeftPanel';
import CarShow from './components/CarShow';
import Grid from '@material-ui/core/Grid';
import {fetchCarDetails, fetchLenderPrograms, fetchLenders, fetchLenderTerms} from "./Service";
import {connect} from "react-redux";
import LenderInputModalDialog from "./components/LenderInputModalDialog";
import {useMediaQuery, useTheme} from "@material-ui/core";
import MenuBar from "./components/MenuBar";
import ScrollToTop from "react-scroll-to-top";
import HomePage from "./components/HomePage";
import CarPage from "./components/CarPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = (props) => {
    let theme = useTheme();
    let mdUp = useMediaQuery(theme.breakpoints.up("md"));
    props.updateScreenData({
        mdUp:mdUp
    });

    useEffect(() => {
        props.loading(true);

        Promise.all([fetchCarDetails(), fetchLenders(), fetchLenderTerms(), fetchLenderPrograms()]).then((result) => {
            let carDetails = result[0];
            let lenders = result[1];
            let lenderTerms = result[2];
            let lenderPrograms = result[3];

            props.fetchDataFinished(carDetails, lenders, lenderTerms, lenderPrograms);
            props.loading(false);
        });
    }, [props.loading, props.fetchDataFinished]);

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/car">
                    <CarPage/>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchDataFinished: (carDetails, lenders, lenderTerms, lenderPrograms) => {
            dispatch({
                type:"FETCH_DATA_FINISHED",
                carDetails:carDetails,
                lenders:lenders,
                lenderTerms:lenderTerms,
                lenderPrograms:lenderPrograms
            })
        },
        loading:(value) => {
            dispatch({
                type:"LOADING",
                value: value
            })
        },
        updateScreenData: (value) => {
            dispatch({
                type:"UPDATE_SCREEN_DATA",
                value: value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
