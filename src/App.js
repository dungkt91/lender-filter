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
        this.menuBtnOnClick = this.menuBtnOnClick.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.state = {
            displayFilters:false,
            displayCarShow:true,
            anchorEl:null
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

    menuBtnOnClick(event){
        this.setState({anchorEl:event.currentTarget})    ;
    }

    closeMenu(){
        this.setState({anchorEl:null});
    }

    render() {
        return (
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
                                <Grid item xs={12} style={{marginTop:"16px", marginBottom:"16px", display:this.state.displayFilters?"":"none"}}>
                                      <Paper style={{padding:"10px"}}>
                                            <LendersFilter ref={this.lendersFilter} submitOnClick={this.submitOnclick}/>
                                      </Paper>
                                </Grid>
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
