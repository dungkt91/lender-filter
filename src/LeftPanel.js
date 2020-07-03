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

class LeftPanel extends React.Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.filterRef = React.createRef();
        this.lenderRef = React.createRef();
        const {filters, lenderToPrograms, carDetails} = this.parseProps(this.props);
        console.log(this.props);
        console.log(filters);

        this.state = {
            selectedTabIndex:0,
            filters:filters,
            lenderToPrograms:lenderToPrograms,
            carDetails:carDetails,
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

    parseProps(props) {
        let makes = new Set();
        let makeToModelsDict = {};
        let makeToCountDict = {};
        let modelToCountDict = {};
        let models = new Set();
        let yearSet = new Set();

        for (let i = 0; i < props.carDetails.length; i++) {
            let carDetail = props.carDetails[i];
            let make = carDetail["make"];
            let model = carDetail["model"];
            let year = carDetail["year"];

            makes.add(make);
            models.add(model);
            if (!isNaN(year)) {
                yearSet.add(year);
            }

            if (!(make in makeToModelsDict)) {
                makeToModelsDict[make] = new Set();
            }

            makeToModelsDict[make].add(model);

            if(!(make in makeToCountDict)){
                makeToCountDict[make] = 0;
            }

            makeToCountDict[make] = makeToCountDict[make] + 1;

            if(!(model in modelToCountDict)){
                modelToCountDict[model] = 0;
            }

            modelToCountDict[model] = modelToCountDict[model] + 1;
        }

        let yearRangeList = [];

        // Create year range list
        for (let year of yearSet) {
            yearRangeList.push([year]);
        }

        let filters = [
            {
                "title": "Year",
                "type": "range",
                "minTitle": "Min",
                "maxTitle": "Max",
                "value_type":"discrete",
                "values":yearRangeList,
                "expand": this.props.filtersExpanded
            },
            {
                "title": "Make",
                "type": "list",
                "options": Array.from(makes),
                "expand": this.props.filtersExpanded,
                "displayCount":true,
                "counts": makeToCountDict,
                "titleTransformFunc":Utils.convertStr
            },
            {
                "title": "Model",
                "type": "list",
                "dependent_filter": "Make",
                "dependent_list": makeToModelsDict,
                "options": Array.from(models),
                "expand": this.props.filtersExpanded,
                "displayCount":true,
                "counts":modelToCountDict,
                "titleTransformFunc":Utils.convertStr
            },
            {
                "title": "Mileage",
                "type": "range",
                "minTitle": "Min",
                "maxTitle": "Max",
                "value_type":"continuous",
                "values": this.createRangeListContinuousValue(props.carDetails.map(carDetail => parseInt(carDetail["mileage"])), 10),
                "expand": this.props.filtersExpanded,
                "endAdornment":'mi'
            },
            {
                "title": "Total cost",
                "type": "range",
                "minTitle": "Min",
                "maxTitle": "Max",
                "value_type":"continuous",
                "values": this.createRangeListContinuousValue(props.carDetails.map(carDetail => parseInt(carDetail["total_cost"])), 10),
                "expand": this.props.filtersExpanded,
                "startAdornment":'$'
            }
        ];

        if(this.props.init){
            for(let filterTitle in this.props.init){
                for(let filter of filters){
                    if (filter["title"] == filterTitle){
                        if (filter["type"] == "list"){
                            filter["init"] = this.props.init[filterTitle]["selectedOptions"];
                        }else{
                            filter["init"] = this.props.init[filterTitle];
                        }
                        break;
                    }
                }
            }
        }

        let lenderToPrograms = {};
        let lenderIdToLenderName = {};
        props.lenders.forEach(lender => {
            lenderIdToLenderName[lender["id"]] = lender["name"];
        });

        props.lenderPrograms.forEach(lenderProgram => {
            let lenderName = lenderIdToLenderName[lenderProgram["lender_id"]];

            if (!(lenderName in lenderToPrograms)) {
                lenderToPrograms[lenderName] = [];
            }

            lenderToPrograms[lenderName].push(lenderProgram["name"]);
        });

        return {filters: filters, lenderToPrograms: lenderToPrograms, carDetails: props.carDetails};
    }

    createRangeListContinuousValue(values, partsCount){
        let min = Math.min(...values);
        let max = Math.max(...values);
        let x = (max - min)/partsCount;

        return [min, max];
    }

    getFilterValues(){
        return this.filterRef.current.getFilterValues();
    }

    getLenderInputs(){
        return this.lenderRef.current.getLenderInputs();
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
                        <Filter ref={this.filterRef} filters={this.state.filters}
                        onChange={this.props.filterOnChange}
                        />
                        </div>
                        <div className={this.state.selectedTabIndex==1?'':'hide'}>
                        <Lender init={getLenderInputs()} ref={this.lenderRef} lenderToPrograms={this.state.lenderToPrograms} onChange={this.props.lenderOnChange}/>
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
                    <Filter ref={this.filterRef} filters={this.state.filters}
                            onChange={this.props.filterOnChange}
                    />
                </DialogContent>
            </Dialog>
            <Dialog  fullScreen open={this.state.lendersDialogOpen}>
                <AppBar style={{position: "relative"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.closeLender} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Lender init={getLenderInputs()} ref={this.lenderRef} lenderToPrograms={this.state.lenderToPrograms}
                        onChange={this.props.lenderOnChange}/>
            </Dialog>
        </div>
        );
    }
}

export default LeftPanel;