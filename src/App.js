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
import ToggleButton from "@material-ui/lab/ToggleButton";
import {FaFilter} from "react-icons/all";

const App = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <AppClass isBigScreen={mdUp}/>
}

class AppClass extends React.Component{
    constructor() {
        super();

        this.carshowRef= React.createRef();
        this.lendersFilter = React.createRef();
        this.filterOnClick = this.filterOnClick.bind(this);
        this.submitOnclick = this.submitOnclick.bind(this);

        this.state = {
            displayFilters:true,
            displayCarShow:false
        }
    }

    filterOnClick(event){
        console.log('Filter')
        this.setState({displayFilters:!this.state.displayFilters});
    }

    submitOnclick(){
        this.setState({
            displayFilters:false,
            displayCarShow:true
        })
        window.scrollTo(0,0);
    }

    render() {
        return (
            <Grid container style={{backgroundColor:"rgb(247,248,248)"}}>
                <Grid item xl={1} xs={0} />
                <Grid item xl={10} xs={12}>
                    <AppBar position="static">
                        <Tabs>
                            <Tab label="Home"/>
                            <Tab label="Rate Sheet" disabled/>
                            <Tab label="Quick Quote" disabled/>
                            <Tab label="Lender Assist" disabled/>
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xl={1} xs={0}/>
                <Grid item xl={1} xs={0}/>
                <Grid item xl={10} xs={12}>
                    <Grid container>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={2}>
                                {this.state.displayCarShow?(
                                    <React.Fragment>
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
                                        <Grid item xs={12} sm={4} lg={2} style={{textAlign:"center"}}>
                                            <ToggleButton onClick={this.filterOnClick} selected={this.state.displayFilters}><FaFilter/>  Filter</ToggleButton>
                                        </Grid>
                                    </React.Fragment>
                                ):null
                                }
                                {
                                    this.state.displayFilters?(
                                        <Grid item xs={12} style={{marginTop:"16px", marginBottom:"16px"}}>
                                            <Paper style={{padding:"10px"}}>
                                                <LendersFilter ref={this.lendersFilter} submitOnClick={this.submitOnclick}/>
                                            </Paper>
                                        </Grid>
                                    ):null
                                }
                                {
                                    this.state.displayCarShow?(
                                        <Grid item xs={12}>
                                            <CarShow ref={this.carshowRef}/>
                                        </Grid>
                                    ):null
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={1} xs={0}/>
            </Grid>
        );
    }
}

export default App;
