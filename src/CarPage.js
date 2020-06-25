import React from 'react';
import { withRouter } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import Menubar from "./Menubar";
import { BsArrowLeft } from "react-icons/bs";
import CarShowElement from "./CarShowElement";

class CarPage extends React.Component {
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        const {history} = this.props;

        history.push('/');
    }

    render() {
        const {history, location} = this.props;
        let carDetailsAvailable = location.state && location.state.carDetails;

        return (
            <>
                <ScrollToTop smooth />
                <Grid container style={{backgroundColor:"rgb(247,248,248)"}}>
                    <Grid item xl={1} xs={0} />
                    <Grid item xl={10} xs={12}>
                        <Menubar isBigScreen={this.props.isBigScreen}/>
                    </Grid>
                    <Grid item xl={1} xs={0}/>
                    <Grid item xl={1} xs={0} />
                    <Grid item xl={10} xs={12}>
                        <Grid container item>
                            <Grid item xs={12}>
                                <BsArrowLeft /> <a href={"#"} onClick={this.goBack}>Search Results</a>
                            </Grid>
                        </Grid>
                        {carDetailsAvailable?<CarShowElement details={location.state.carDetails}/>:'Not found'}
                    </Grid>
                    <Grid item xl={1} xs={0}/>
                </Grid>
            </>
        )
    }
}

export default withRouter(CarPage);