import React from 'react';
import logo from './logo.svg';
import './App.css';
import LenderFilter from "./LenderFilter";
import LendersFilter from "./LenderFilters";
import Grid from "@material-ui/core/Grid";
import Form from "@material-ui/core/FormControl"
import CarShow from "./CarShow";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class App extends React.Component{
    constructor() {
        super();

        this.carshowRef= React.createRef();
    }

    render() {
        return (
            <Grid container spacing={4}>
                <Grid item lg={3} sm={12}>
                    <img style={{height: "100px"}}/>
                    <LendersFilter carShowRef={this.carshowRef}/>
                </Grid>
                <Grid item lg={9} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AppBar position="static" color={"default"}>
                                <Tabs>
                                    <Tab label="Home"/>
                                    <Tab label="Rate Sheet" disabled/>
                                    <Tab label="Quick Quote" disabled/>
                                    <Tab label="Lender Assist" disabled/>
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Select value={0}>
                                <MenuItem value={0}>Sort by (choose)</MenuItem>
                            </Select>
                            <Select value={0} style={{marginLeft: "50px"}}>
                                <MenuItem value={0}>Sort by (choose)</MenuItem>
                            </Select>
                            <Select value={0} style={{marginLeft: "50px"}}>
                                <MenuItem value={0}>Sort by (choose)</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <CarShow ref={this.carshowRef}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default App;
