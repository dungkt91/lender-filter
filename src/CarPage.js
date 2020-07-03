import React from 'react';
import { withRouter } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import Menubar from "./Menubar";
import { BsArrowLeft } from "react-icons/bs";
import CarShowElement from "./CarShowElement";
import CarList from "./CarList";
import {getLenderData, getLenderInputs} from "./GlobalVariables";
import './CarPage.css';

class CarPage extends React.Component {
    constructor(props) {
        super(props);

        const {location} = this.props;

        let carDetails = null;

        if (location.state && location.state.carDetails){
            carDetails = location.state.carDetails;
        }

        this.state = {
            carDetails: carDetails
        }

        this.goBack = this.goBack.bind(this);
        this.selectCarInCarList = this.selectCarInCarList.bind(this);
    }

    goBack(){
        const {history} = this.props;

        history.push('/');
    }

    selectCarInCarList(carDetails){
        this.setState({carDetails:carDetails});
    }

    render() {
        const {history, location} = this.props;
        let results = [];
        let carIndex = 0;
        let  carDetailsAvailable = false;

        if (location && location.state){
            results = location.state.results;
            carDetailsAvailable = location.state && location.state.carDetails;
            carIndex = location.state.carIndex;
        }

        let lenderInputs = getLenderInputs();

        if (lenderInputs == null){
            lenderInputs = [];
        }

        let carListVersion = "full";
        let screenIsXs = this.props.screenSize["xsUp"] && !this.props.screenSize["smUp"];

        if (screenIsXs){
            carListVersion = "only_buttons";
        }

        return (
            <>
                <ScrollToTop smooth/>
                <Grid container>
                    <Grid item xl={2} xs={0}/>
                    <Grid item xl={8} xs={12}>
                        <Menubar isBigScreen={this.props.screenSize["mdUp"]}/>
                    </Grid>
                    <Grid item xl={2} xs={0}/>
                    <Grid item xl={2} xs={0}/>
                    <Grid item xl={8} xs={12}>
                        <Grid container item>
                            <Grid item xs={12}>
                                <a href={"#"} className={"search_results_back_link"}
                                   onClick={this.goBack}><BsArrowLeft/> All Results</a>
                            </Grid>
                            <Grid item xs={12} className={"car_list"}>
                                {results.length > 0 ? (<CarList version={carListVersion} initSelectedCarIndex={carIndex}
                                                                detailsList={results}
                                                                onChange={this.selectCarInCarList}/>) : null}
                            </Grid>
                            <Grid item xs={12} className={"car_detail"}>
                                {carDetailsAvailable ?
                                    <CarShowElement filtersInputs={lenderInputs} lenderData={getLenderData()}
                                                    details={this.state.carDetails}/> : 'Not found'}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={2} xs={0}/>
                </Grid>
            </>
        )
    }
}

export default withRouter(CarPage);