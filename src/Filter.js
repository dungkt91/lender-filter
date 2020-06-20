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

        this.state = {};
    }

    expandBtnOnClick(event, filterTitle) {
        let stateKeyName = filterTitle + '_expand';
        let newState = {};
        newState[stateKeyName] = !this.state[stateKeyName];

        this.setState(newState);
    }


    render(){
        return (
            <Grid container>
                {
                    this.props.filters.map(filter => {
                        let filterType = filter["type"];
                        let filterComponent = undefined;

                        if (filterType == "list"){
                            filterComponent = <ListFilter {...filter} />;
                        }else if (filterType == "range"){
                            filterComponent = <RangeFilter {...filter} />
                        }

                        return (
                            <React.Fragment>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <Collapse in={this.state[filter["title"] + "_expand"]}>
                                    {filterComponent}
                                    </Collapse>
                                </Grid>
                            </React.Fragment>
                        );
                    })
                }
            </Grid>
        )
    }
}

export default Filter;