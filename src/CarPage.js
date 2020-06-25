import React from 'react';
import { withRouter } from "react-router";
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import Menubar from "./Menubar";

class CarPage extends React.Component {
    render() {
        return (
            <>
                <ScrollToTop smooth />
                <Grid container style={{backgroundColor:"rgb(247,248,248)"}}>
                    <Grid item xl={1} xs={0} />
                    <Grid item xl={10} xs={12}>
                        <Menubar isBigScreen={this.props.isBigScreen}/>
                    </Grid>
                    <Grid item xl={1} xs={0}/>
                </Grid>
            </>
        )
    }
}

export default withRouter(CarPage);