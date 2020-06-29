import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Filter from './Filter';
import './LeftPanel.css';
import Lender from './Lender';
import {getLenderInputs} from "./GlobalVariables";
import './LeftPanel.css';

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
            carDetails:carDetails
        }
    }

    handleChange(event, newSelectedTabIndex){
        this.setState({selectedTabIndex:newSelectedTabIndex});
    }

    convertStr(str){
        let words = str.split(/(\s+)/);

        return words.map(word => {
            let result = '';

            if (word.length > 0){
                result += word.charAt(0).toUpperCase();
            }

            if (word.length > 1){
                result += word.substring(1).toLowerCase();
            }

            return result;
        }).join(' ');
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
                "title": "Make",
                "type": "list",
                "options": Array.from(makes),
                "expand": this.props.filtersExpanded,
                "displayCount":true,
                "counts": makeToCountDict,
                "titleTransformFunc":this.convertStr
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
                "titleTransformFunc":this.convertStr
            },
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

    render(){
        return (
        <div className={"left_panel"}>
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
        </div>
        );
    }
}

export default LeftPanel;