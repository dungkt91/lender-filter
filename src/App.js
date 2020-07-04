import React from 'react';
import './App.css';
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "react-scroll-to-top/lib/index.css";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CarPage from "./CarPage";
import {fetchCars, fetchLenderPrograms, fetchLenders, fetchLenderTerms} from "./Api";
import {setLenderData} from "./GlobalVariables";
import { connect } from 'react-redux';

const App = (props) => {
    const theme = useTheme();
    const xsUp = useMediaQuery(theme.breakpoints.up("xs"));
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

    return <AppClass screenSize={{
        xsUp:xsUp,
        smUp:smUp,
        mdUp:mdUp,
        lgUp:lgUp,
        xlUp:xlUp
    }} {...props}/>
}

class AppClass extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            carJson:[],
            lendersJson:[],
            lenderTermsJson:[],
            lenderProgramsJson:[],
            isLoading: true
        }

        Promise.all([fetchCars(), fetchLenders(), fetchLenderTerms(), fetchLenderPrograms()]).then(responses => Promise.all(responses.map(response => response.json()))).then(jsons => {
            let carJson = jsons[0];
            carJson = this.convertKmToMileage(carJson);

            let lendersJson = jsons[1];
            let lenderTermsJson = jsons[2];
            let lenderProgramsJson = jsons[3];

            setLenderData([lendersJson, lenderProgramsJson, lenderTermsJson]);

            this.setState({carJson:carJson, lendersJson:lendersJson, lenderTermsJson:lenderTermsJson, lenderProgramsJson:lenderProgramsJson, isLoading:false});
            this.props.updateData(carJson, lendersJson, lenderTermsJson, lenderProgramsJson);
        });
    }

    convertKmToMileage(carJson){
        return carJson.map(car => {
            let mileageLowerCase = car["mileage"].toLowerCase();

            if(mileageLowerCase.includes('km')){
                car["mileage"] = Math.floor(0.621371 * parseFloat(mileageLowerCase.replace("km", "")));
            }

            return car;
        });
    }

    render(){
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path="/car">
                        <CarPage screenSize={this.props.screenSize}/>
                    </Route>
                    <Route path="/">
                            <HomePage screenSize={this.props.screenSize} {...this.state}/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateData: (carDetails, lenders, lenderTerms, lenderPrograms) => {
            dispatch({
                type:'FETCH_DATA',
                carDetails: carDetails,
                lenders: lenders,
                lenderTerms:lenderTerms,
                lenderPrograms:lenderPrograms
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
