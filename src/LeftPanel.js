import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Filter from './Filter';
import './LeftPanel.css';
import Lender from './Lender';
import {getLenderInputs} from "./GlobalVariables";
import './LeftPanel.css';
import Utils from "./Utils";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LenderInput from "./LenderInput";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from "react-redux";
import RangeFilter from "./RangeFilter";
import ListFilter from "./ListFilter";

class LeftPanel extends React.Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.filterRef = React.createRef();
        this.lenderRef = React.createRef();

        this.state = {
            selectedTabIndex:0,
            lenderToPrograms:{},
            carDetails:[],
            lenderDialogOpen:false,
            filterDialogOpen:false
        }

        this.openFilter = this.openFilter.bind(this);
        this.openLender = this.openLender.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.closeLender = this.closeLender.bind(this);
    }

    handleChange(event, newSelectedTabIndex){
        this.setState({selectedTabIndex:newSelectedTabIndex});
    }

    openFilter(){
        this.setState({filterDialogOpen:true});
    }

    closeFilter(){
        this.setState({filterDialogOpen:false});
    }

    openLender(){
        this.setState({lendersDialogOpen:true});
    }

    closeLender(){
        this.setState({lendersDialogOpen:false});
    }

    render(){
        return (
        <div className={"left_panel"}>
            {
                this.props.screenSize["smUp"]?(
                    <>
                        <Tabs value={this.state.selectedTabIndex} onChange={this.handleChange} TabIndicatorProps={{style:{background:'#4153AF'}}}>
                            <Tab label={"Filter"} className={"filter_tab " + (this.state.selectedTabIndex==0?"tab_selected":"tab_deselected")}/>
                            <Tab label={"Lender"} className={"lender_tab " + (this.state.selectedTabIndex==1?"tab_selected":"tab_deselected")} />
                        </Tabs>
                        <div className={this.state.selectedTabIndex==0?'':'hide'}>
                            <Filter title={"Year"} name={"year_filter"}><RangeFilter name={"year"}/></Filter>
                            <Filter title={"Make"} name={"make_filter"}><ListFilter name={"make"}/></Filter>
                            <Filter title={"Model"} name={"model_filter"}><ListFilter name={"model"} /></Filter>
                            <Filter title={"Mileage"} name={"mileage_filter"}><RangeFilter name={"mileage"}/></Filter>
                            <Filter title={"Total cost"} name={"total_cost_filter"}><RangeFilter name={"total_cost"}/></Filter>
                        </div>
                        <div className={this.state.selectedTabIndex==1?'':'hide'}>
                        {/*<Lender init={getLenderInputs()} ref={this.lenderRef} lenderToPrograms={lenderToPrograms} onChange={this.props.lenderOnChange}/>*/}
                        </div>
                    </>
                ):(
                    <>
                        <Grid container>
                            <Grid xs={6}>
                                <Button className={"filter_btn"} variant={"contained"} style={{width:"100%"}} onClick={this.openFilter}>Filter</Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button className={"lender_btn"} variant={"contained"} style={{width:"100%"}} onClick={this.openLender}>Lender</Button>
                            </Grid>
                        </Grid>
                    </>
                )
            }
            <Dialog  fullScreen open={this.state.filterDialogOpen}>
                <AppBar  style={{position: "relative"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.closeFilter} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Filter title={"Year"} name={"year_filter"}><RangeFilter name={"year"}/></Filter>
                    <Filter title={"Make"} name={"make_filter"}><ListFilter name={"make"}/></Filter>
                    <Filter title={"Model"} name={"model_filter"}><ListFilter name={"model"} /></Filter>
                    <Filter title={"Mileage"} name={"mileage_filter"}><RangeFilter name={"mileage"}/></Filter>
                    <Filter title={"Total cost"} name={"total_cost_filter"}><RangeFilter name={"total_cost"}/></Filter>
                </DialogContent>
            </Dialog>
            {/*<Dialog  fullScreen open={this.state.lendersDialogOpen}>*/}
            {/*    <AppBar style={{position: "relative"}}>*/}
            {/*        <Toolbar>*/}
            {/*            <IconButton edge="start" color="inherit" onClick={this.closeLender} aria-label="close">*/}
            {/*                <CloseIcon/>*/}
            {/*            </IconButton>*/}
            {/*        </Toolbar>*/}
            {/*    </AppBar>*/}
            {/*    <Lender init={getLenderInputs()} ref={this.lenderRef} lenderToPrograms={lenderToPrograms}*/}
            {/*            onChange={this.props.lenderOnChange}/>*/}
            {/*</Dialog>*/}
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lenders:state.lenders,
        lenderPrograms:state.lenderPrograms,
        carDetails:state.carDetails
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);