import React from 'react';
import ListFilter from "./ListFilter";
import RangeFilter from "./RangeFilter";
import {Collapse} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IconButton } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import './Filter.css';
import {connect} from "react-redux";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.expandOrCollapse = this.expandOrCollapse.bind(this);
    }

    expandOrCollapse(event){
        this.props.expandOrCollapse(this.props.name, !this.props.expand);
    }

    render(){
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container className={"expandable"} onClick={this.expandOrCollapse}>
                            <Grid item xs={10}>
                                <span className={'filter_title'}>{this.props.title}</span>
                            </Grid>
                            <Grid item xs={2} align='right'>
                                {this.props.expand?(<ExpandLess/>):(<ExpandMore />)}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={this.props.expand}>
                            {this.props.children}
                        </Collapse>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
        expand:state[ownProps.name + "_expand"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        expandOrCollapse: (name, state) => {
            dispatch({
                type:'FILTER_EXPAND_COLLAPSE',
                name:name,
                state:state
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);