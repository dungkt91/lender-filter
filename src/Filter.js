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
        for(let filter of this.state.filters){
            let isDependentList = filter["type"] == "list" && "dependent_filter" in filter && "dependent_list" in filter;

            if (isDependentList){
                let dependentFilter = filter["dependent_filter"];
                let dependentList = filter["dependent_list"];

                let selectedOptions = this.refsDict[dependentFilter].getSelectedOptions();
                let newOptions = new Set();

                for(let selectedOption of selectedOptions){
                    dependentList[selectedOption].forEach(newOptions.add, newOptions);
                }

                filter["options"] = Array.from(newOptions);
            }
        }

        this.forceUpdate();
    }

    createFilter(filter, filterIndex){
        let lastFilterIndex = this.state.filters.length - 1;
        let filterType = filter["type"];
        let filterComponent = undefined;

        if (filterType == "list"){
            filterComponent = <ListFilter {...filter} ref={curFilter => this.refsDict[filter["title"]] = curFilter} onChange={(event) => this.filterOnChange(event, filter["title"])}/>;
        }else if (filterType == "range"){
            filterComponent = <RangeFilter {...filter} ref={curFilter => this.refsDict[filter["title"]] = curFilter} />
        }

        return (
            <React.Fragment>
                <Grid item xs={12} className={"padding10"}>
                    <Grid container>
                        <Grid item xs={10}>
                            <span className={'filter_title'}>{filter["title"]}</span>
                        </Grid>
                        <Grid item xs={2} align='right'>
                            <IconButton onClick={(event) => this.expandBtnOnClick(event, filter["title"])}>
                                {this.state[filter["title"] + "_expand"]?(<ExpandLess/>):(<ExpandMore />)}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Collapse in={this.state[filter["title"] + "_expand"]}>
                        {filterComponent}
                    </Collapse>
                </Grid>
                {
                    filterIndex != lastFilterIndex ?
                        (
                            <Grid item xs={12}>
                                <hr className={"line_seperator"}/>
                            </Grid>
                        ) : null
                }
            </React.Fragment>
        );
    }

    render(){
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