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
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import {makeStyles} from "@material-ui/core/styles";
import ScrollToTop from "react-scroll-to-top";
import "react-scroll-to-top/lib/index.css";
import Sort from "./Sort";
import LeftPanel from "./LeftPanel";
import {fetchCars, fetchLenderPrograms, fetchLenders, fetchLenderTerms} from "./Api";

const App = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <AppClass isBigScreen={mdUp}/>
}

class AppClass extends React.Component{
    constructor() {
        super();

        this.leftPanelRef = React.createRef();

        this.state = {
            carJson:[],
            lendersJson:[],
            lenderTermsJson:[],
            lenderProgramsJson:[],
            isLoading: true,
            filterValues: {}
        }

        Promise.all([fetchCars(), fetchLenders(), fetchLenderTerms(), fetchLenderPrograms()]).then(responses => Promise.all(responses.map(response => response.json()))).then(jsons => {
           let carJson = jsons[0];
           let lendersJson = jsons[1];
           let lenderTermsJson = jsons[2];
           let lenderProgramsJson = jsons[3];

           this.setState({carJson:carJson, lendersJson:lendersJson, lenderTermsJson:lenderTermsJson, lenderProgramsJson:lenderProgramsJson, isLoading:false});
        });
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
                    <AppBar position="static">
                        {this.props.isBigScreen ? (
                            <React.Fragment>
                                <Tabs>
                                    <Tab label="Home"/>
                                    <Tab label="Rate Sheet" disabled/>
                                    <Tab label="Quick Quote" disabled/>
                                    <Tab label="Lender Assist" disabled/>
                                </Tabs>
                            </React.Fragment>) : (
                                <Toolbar>
                                    <IconButton
                                        aria-label="menu"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        style={{"color":"white"}}
                                        onClick={this.menuBtnOnClick}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.closeMenu}
                                    >
                                        <MenuItem>HOME</MenuItem>
                                        <MenuItem>RATE SHEET</MenuItem>
                                        <MenuItem>QUICK QUOTE</MenuItem>
                                        <MenuItem>LENDER ASSIST</MenuItem>
                                    </Menu>
                                </Toolbar>
                            )
                        }
                    </AppBar>
                </Grid>
                <Grid item xl={1} xs={0}/>
                <Grid item sm={1} xs={0}/>
                <Grid item md={2} sm={3} xs={12}>
                   <LeftPanel ref={this.leftPanelRef} carDetails={this.state.carJson} lenders={this.state.lendersJson} lenderPrograms={this.state.lenderProgramsJson} filterOnChange={this.filterOnChange}/>
                </Grid>
                <Grid item md={8} sm={7} xs={12}>
                    <CarShow carDetails={this.state.carJson} filterValues={this.state.filterValues}/>
                </Grid>
                <Grid item sm={1} xs={0}/>
            </Grid>
            </React.Fragment>
        );
    }
}

export default App;
