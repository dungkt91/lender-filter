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

        if (location.state.carDetails){
            carDetails = location.state.carDetails;
        }

        this.state = {
            carDetails: location.state.carDetails
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

        if (location.state.results){
            results = location.state.results;
        }

        let carDetailsAvailable = location.state && location.state.carDetails;
        let lenderInputs = getLenderInputs();

        if (lenderInputs == null){
            lenderInputs = [];
        }

        return (
            <>
                <ScrollToTop smooth />
                <Grid container>
                    <Grid item xl={2} xs={0} />
                    <Grid item xl={8} xs={12}>
                        <Menubar isBigScreen={this.props.isBigScreen}/>
                    </Grid>
                    <Grid item xl={2} xs={0}/>
                    <Grid item xl={2} xs={0} />
                    <Grid item xl={8} xs={12}>
                        <Grid container item>
                            <Grid item xs={12}>
                                <a href={"#"} className={"search_results_back_link"}onClick={this.goBack}><BsArrowLeft /> Search Results</a>
                            </Grid>
                            <Grid item xs={12}>
                                    <CarList initSelectedCarIndex={location.state.carIndex} detailsList={results} onChange={this.selectCarInCarList}/>
                            </Grid>
                            <Grid item xs={12}>
                                {carDetailsAvailable?<CarShowElement filtersInputs={lenderInputs} lenderData={getLenderData()} details={this.state.carDetails}/>:'Not found'}
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