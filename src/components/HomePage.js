import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import MenuBar from "./MenuBar";
import LeftPanel from "./LeftPanel";
import CarShow from "./CarShow";
import LenderInputModalDialog from "./LenderInputModalDialog";
import React from "react";
import "./HomePage.css";

class HomePage extends React.Component {
    render(){
        return (<>
            <ScrollToTop smooth/>
            <Grid container className={"app"}>
                <Grid item xs={12} className={"menu_bar"}>
                    <MenuBar />
                </Grid>
                <Grid item xs={12} className={"content"}>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <LeftPanel/>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <CarShow/>
                            <LenderInputModalDialog/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>);
    }
}

export default HomePage;