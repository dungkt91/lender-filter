import React from 'react';
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LeftPanel from "./LeftPanel";
import {ClipLoader} from "react-spinners";
import CarShow from "./CarShow";
import {fetchCars, fetchLenderPrograms, fetchLenders, fetchLenderTerms} from "./Api";
import {css} from "@emotion/core";
import Menubar from "./Menubar";

const clipLoaderCss = css`
    border-color:rgb(55,71,172);
    position:absolute;
    border-bottom-color:transparent;
    top:50%;
`;

class HomePage extends React.Component{
    constructor() {
        super();

        this.leftPanelRef = React.createRef();
        this.state = {
            filterValues: {}
        }
        this.filterOnChange = this.filterOnChange.bind(this);
    }

    filterOnChange(){
        this.setState({filterValues:this.leftPanelRef.current.getFilterValues()});
    }

    render() {
        return (
            <React.Fragment>
                <ScrollToTop smooth />
                <Grid container style={{backgroundColor:"rgb(247,248,248)"}}>
                    <Grid item xl={1} xs={0} />
                    <Grid item xl={10} xs={12}>
                        <Menubar isBigScreen={this.props.isBigScreen}/>
                    </Grid>
                    <Grid item xl={1} xs={0}/>
                    <Grid item sm={1} xs={0}/>
                    {this.props.isLoading?(
                        <Grid item xs={12}>
                            <div style={{display:'flex', justifyContent:'center'}}><ClipLoader css={clipLoaderCss}/></div>
                        </Grid>
                    ):(
                        <>
                        <Grid item md={2} sm={3} xs={12}>
                            <LeftPanel ref={this.leftPanelRef} carDetails={this.props.carJson} lenders={this.props.lendersJson} lenderPrograms={this.props.lenderProgramsJson} filterOnChange={this.filterOnChange}/>
                        </Grid>
                        <Grid item md={8} sm={7} xs={12}>
                            <CarShow carDetails={this.props.carJson} filterValues={this.state.filterValues}/>
                        </Grid>
                        </>
                    )}
                    <Grid item sm={1} xs={0}/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default HomePage;