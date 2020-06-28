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

const App = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <AppClass isBigScreen={mdUp}/>
}


class AppClass extends React.Component{
    constructor(props) {
        super(props);

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

            setLenderData([lendersJson, lenderTermsJson, lenderProgramsJson]);

            this.setState({carJson:carJson, lendersJson:lendersJson, lenderTermsJson:lenderTermsJson, lenderProgramsJson:lenderProgramsJson, isLoading:false});
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
                        <CarPage isBigScreen={this.props.isBigScreen} />
                    </Route>
                    <Route path="/">
                        <HomePage isBigScreen={this.props.isBigScreen} {...this.state}/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
