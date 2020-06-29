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
import Loader from './Loader';
import {getFilterValues, setFilterValues, setLenderInputs} from "./GlobalVariables";

class HomePage extends React.Component{
    constructor() {
        super();

        this.leftPanelRef = React.createRef();
        this.state = {
            filterValues: {}
        }

        this.filterOnChange = this.filterOnChange.bind(this);
        this.lenderOnChange = this.lenderOnChange.bind(this);
    }

    filterOnChange(){
        let filterValues = this.leftPanelRef.current.getFilterValues();

        this.setState({filterValues:filterValues}, () => {
            setFilterValues(filterValues);
        });
    }

    lenderOnChange(){
        let lenderInputs = this.leftPanelRef.current.getLenderInputs();
        console.log(lenderInputs);

        setLenderInputs(lenderInputs);
    }

    render() {
        return (
            <React.Fragment>
                <ScrollToTop smooth />
                <Grid container>
                    <Grid item xl={2} xs={0} />
                    <Grid item xl={8} xs={12}>
                        <Menubar isBigScreen={this.props.isBigScreen}/>
                    </Grid>
                    <Grid item xl={2} xs={0}/>
                    <Grid item xl={2} xs={0}/>
                    {this.props.isLoading?(
                        <Grid item xs={12}>
                            <Loader />
                        </Grid>
                    ):(
                        <>
                        <Grid item xl={2} sm={3} xs={12}>
                            <LeftPanel init={getFilterValues()} filtersExpanded={this.props.isBigScreen} ref={this.leftPanelRef} carDetails={this.props.carJson} lenders={this.props.lendersJson} lenderPrograms={this.props.lenderProgramsJson} filterOnChange={this.filterOnChange} lenderOnChange={this.lenderOnChange}/>
                        </Grid>
                        <Grid item xl={6} sm={9} xs={12}>
                            <CarShow carDetails={this.props.carJson} filterValues={this.state.filterValues}/>
                        </Grid>
                        </>
                    )}
                    <Grid item xl={2} xs={0}/>
                </Grid>
            </React.Fragment>
        );
    }
}

export default HomePage;