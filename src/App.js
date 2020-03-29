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
import Paper from "@material-ui/core/Paper";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const App = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <AppClass isBigScreen={mdUp}/>
}

class AppClass extends React.Component{
    constructor() {
        super();

        this.carshowRef= React.createRef();
    }

    render() {
        return (
            <Grid container style={{backgroundColor:"rgb(247,248,248)"}}>
                <Grid item xl={2} xs={0} />
                <Grid item xl={8} xs={12}>
                    <AppBar position="static">
                        <Tabs>
                            <Tab label="Home"/>
                            <Tab label="Rate Sheet" disabled/>
                            <Tab label="Quick Quote" disabled/>
                            <Tab label="Lender Assist" disabled/>
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xl={2} xs={0}/>
                <Grid item xl={2} xs={0}/>
                <Grid item xl={8} xs={12}>
                    <Grid container>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4} lg={2} style={{textAlign:"center"}}>
                                    <Select value={0}>
                                        <MenuItem value={0}>Sort by (choose)</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={4} lg={2} style={{textAlign:"center"}}>
                                    <Select value={0}>
                                        <MenuItem value={0}>Sort by (choose)</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={4} lg={2} style={{textAlign:"center"}}>
                                    <Select value={0}>
                                        <MenuItem value={0}>Sort by (choose)</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <CarShow ref={this.carshowRef}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={2} xs={0}/>
            </Grid>
        );
    }
}

export default App;
