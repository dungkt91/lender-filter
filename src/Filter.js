import React from 'react';
import ListFilter from "./ListFilter";
import RangeFilter from "./RangeFilter";
import {Collapse} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IconButton } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import './Filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {filters:[]};
        this.filterOnChange = this.filterOnChange.bind(this);
        this.createFilter = this.createFilter.bind(this);
        this.expandOrCollapse = this.expandOrCollapse.bind(this);
    }

    expandBtnOnClick(event, filterTitle) {
        let stateKeyName = filterTitle + '_expand';
        let newState = {};
        newState[stateKeyName] = !this.state[stateKeyName];

        this.setState(newState);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filters:nextProps.filters});
    }

    filterOnChange(event, filterTitle){
        console.log("filterOnChange");
        let newState = {...this.state};

        for(let filter of newState.filters){
            let isDependentList = filter["type"] == "list" && "dependent_filter" in filter && "dependent_list" in filter;

            if (isDependentList){
                let dependentFilter = filter["dependent_filter"];
                let dependentList = filter["dependent_list"];

                let selectedOptions = this.refsDict[dependentFilter].getValues()["selectedOptions"];
                let newOptions = new Set();

                for(let selectedOption of selectedOptions){
                    dependentList[selectedOption].forEach(newOptions.add, newOptions);
                }

                filter["options"] = Array.from(newOptions);
            }
        }

        this.setState(newState, this.props.onChange);
    }

    getFilterValues(){
        let values = {};

        for(let title in this.refsDict){
            let filterType = this.state.filters.filter(filter => filter["title"]===title)[0]["type"];
            values[title] = {
                "type":filterType,
                ...this.refsDict[title].getValues()
            }
        }

        return values;
    }

    expandOrCollapse(event, filterTitle){
        let stateName = filterTitle + '_expand';
        let newState = {};

        newState[stateName] = !this.state[stateName];
        this.setState(newState);
    }

    createFilter(filter, filterIndex){
        let lastFilterIndex = this.state.filters.length - 1;
        let filterType = filter["type"];
        let filterComponent = undefined;

        if (filterType == "list"){
            filterComponent = <ListFilter {...filter} ref={curFilter => this.refsDict[filter["title"]] = curFilter} onChange={(event) => this.filterOnChange(event, filter["title"])}/>;
        }else if (filterType == "range"){
            filterComponent = <RangeFilter {...filter} ref={curFilter => this.refsDict[filter["title"]] = curFilter} onChange={(event) => this.filterOnChange(event, filter["title"])}/>
        }

        return (
            <React.Fragment>
                <Grid item xs={12} className={"filter"}>
                    <Grid container className={"expandable"} onClick={(event) => this.expandOrCollapse(event, filter["title"])}>
                        <Grid item xs={10}>
                            <span className={'filter_title'}>{filter["title"]}</span>
                        </Grid>
                        <Grid item xs={2} align='right'>
                            {this.state[filter["title"] + "_expand"]?(<ExpandLess/>):(<ExpandMore />)}
                        </Grid>
                    </Grid>
                    <Collapse in={this.state[filter["title"] + "_expand"]}>
                        {filterComponent}
                    </Collapse>
                </Grid>
            </React.Fragment>
        );
    }

    render(){
        console.log('render');
        console.log(this.state);
        this.refsDict = {};

        return (
            <Grid container className={"filter_main_content"}>
                {
                    this.state.filters.map(this.createFilter)
                }
            </Grid>
        )
    }
}

export default Filter;