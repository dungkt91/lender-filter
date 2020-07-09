import React from 'react';
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import MenuBar from "./MenuBar";
import LeftPanel from "./LeftPanel";
import CarShow from "./CarShow";
import LenderInputModalDialog from "./LenderInputModalDialog";
import CarList from "../components/CarList";
import { BsArrowLeft } from "react-icons/bs";
import DetailedCar from "./DetailedCar";
import {connect} from "react-redux";
import { withRouter } from "react-router";

class CarPage extends React.Component {
    constructor(props) {
        super(props);

        this.changeCar = this.changeCar.bind(this);
        this.goBack = this.goBack.bind(this);
        let carIndex = 0;

        const {location} = this.props;

        if(location && location.state){
            carIndex = location.state.carIndex;
        }

        this.state = {
            carIndex:carIndex
        }
    }

    changeCar(carIndex){
        this.setState({carIndex: carIndex});
    }

    goBack(){
        const {history} = this.props;

        history.push('/');
    }

    render() {
        let  carDetailsAvailable = false;

        if(this.props.carDetails.length > this.state.carIndex){
            carDetailsAvailable = true;
        }

        return (<>
            <ScrollToTop smooth/>
            <Grid container className={"app"}>
                <Grid item xs={12}>
                    <MenuBar />
                </Grid>
                <Grid item xs={12}>
                    <a href={"#"} className={"search_results_back_link"}
                       onClick={this.goBack}><BsArrowLeft/> All Results</a>
                </Grid>
                {carDetailsAvailable?(
                    <>
                        <Grid item xs={12}>
                            <CarList initSelectedCarIndex={this.state.carIndex} onChange={this.changeCar} />
                        </Grid>
                        <Grid item xs={12}>
                            <DetailedCar details={this.props.carDetails[this.state.carIndex]}/>
                        </Grid>
                    </>
                ):(
                    'Not found'
                )}
                <LenderInputModalDialog/>
            </Grid>
        </>);
    }
}
const mapStateToProps = (state, ownProps) => {

    return {
        carDetails:state["postProcessingCarDetails"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarPage));