import React from 'react';
import Filter from "./Filter";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import "./LeftPanel.css";
import Lender from "./Lender";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";

class LeftPanel extends React.Component {
    constructor(props) {
        super (props);

        this.changeTab = this.changeTab.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.openLender = this.openLender.bind(this);
        this.closeLender = this.closeLender.bind(this);

        this.state = {
            "filterDialogOpen":false,
            "lenderDialogOpen":false
        }
    }

    changeTab(event, newTabIndex){
        this.props.changeTab(newTabIndex);
    }

    openFilter(){
        this.setState({
            "filterDialogOpen":true
        });
    }

    closeFilter(){
        this.setState({
            "filterDialogOpen":false
        })
    }

    openLender(){
        this.setState({
            "lenderDialogOpen":true
        })
    }

    closeLender(){
        this.setState({
            "lenderDialogOpen":false
        })
    }

    render(){
        let filterTabClassName = "tab filter " + (this.props.activeTabIndex == 0?"active":"deactivate");
        let lenderTabClassName = "tab lender " + (this.props.activeTabIndex == 1?"active":"deactivate");

        return (
            <>
                {this.props.screenData["mdUp"]?(
                    <>
                        <Tabs value={this.props.activeTabIndex} onChange={this.changeTab} TabIndicatorProps={{style:{background:'#3f51b5'}}}>
                            <Tab label={"Filter"} className={filterTabClassName}/>
                            <Tab label={"Lender"} className={lenderTabClassName}/>
                        </Tabs>
                        {this.props.activeTabIndex == 0 ? <Filter/> : null}
                        {this.props.activeTabIndex == 1 ? <Lender/> : null}
                    </>
                ):(
                        <>
                            <Grid container>
                                <Grid item xs={6} style={{padding:10}}>
                                    <Button variant={"contained"} className="filter_btn" onClick={this.openFilter}>Filter</Button>
                                </Grid>
                                <Grid item xs={6} style={{padding:10}}>
                                    <Button variant={"contained"} className="lender_btn" onClick={this.openLender}>Lender</Button>
                                </Grid>
                            </Grid>
                            <Dialog  fullScreen open={this.state.filterDialogOpen}>
                                <AppBar  style={{position: "relative"}}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={this.closeFilter} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <DialogContent>
                                    <Filter/>
                                </DialogContent>
                            </Dialog>
                            <Dialog  fullScreen open={this.state.lenderDialogOpen}>
                                <AppBar  style={{position: "relative"}}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={this.closeLender} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                                <DialogContent>
                                    <Lender/>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}

            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        activeTabIndex:state["tabIndex"],
        screenData:state["screenData"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeTab: (tabIndex) => {
            dispatch({
                type:"CHANGE_TAB",
                index:tabIndex
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);