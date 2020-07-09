import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import Slider from '@material-ui/core/Slider';
import "./RangeFilter.css";
import InputAdornment from "@material-ui/core/InputAdornment";

class RangeFilter extends React.Component {
    constructor(props) {
        super (props);

        this.sliderChange = this.sliderChange.bind(this);
        this.minValTextFileChange = this.minValTextFileChange.bind(this);
        this.maxValTextFileChange = this.maxValTextFileChange.bind(this);
    }

    sliderChange(event, values){
        let currentMin = values[0];
        let currentMax = values[1];

        this.props.changeValues({
            "currentMin":currentMin,
            "currentMax":currentMax
        });
    }

    minValTextFileChange(event){
        let value = event.target.value;


        this.props.changeValues({
            "currentMin":value
        });
    }

    maxValTextFileChange(event){
        let value = event.target.value;

        this.props.changeValues({
            "currentMax":value
        });
    }

    render(){
        let inputProps = {};

        if (this.props.unit && this.props.unit_position){
            if(this.props.unit_position == "start"){
                inputProps = {
                    startAdornment: <InputAdornment position="start">{this.props.unit}</InputAdornment>,
                };
            }else if(this.props.unit_position == "end"){
                inputProps = {
                    endAdornment: <InputAdornment position="end">{this.props.unit}</InputAdornment>,
                };
            }
        }
        return (
            <>
                <Grid container className={"range_filter"}>
                    <Grid item xs={4}>
                        <TextField size="small" variant="outlined" value={this.props.currentMin} label={"Min"} onChange={this.minValTextFileChange} InputProps={inputProps}/>
                    </Grid>
                    <Grid item xs={4} className={"to_text"}>
                        To
                    </Grid>
                    <Grid item xs={4}>
                        <TextField size="small" variant="outlined" value={this.props.currentMax} label={"Max"}  onChange={this.maxValTextFileChange} InputProps={inputProps}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Slider min={this.props.min} max={this.props.max}
                                value={[this.props.currentMin, this.props.currentMax]}
                                step={1} onChange={this.sliderChange}/>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let filters = state["filters"][ownProps["name"]];

    return {
        min:filters["min"],
        max:filters["max"],
        currentMin: filters["currentMin"],
        currentMax: filters["currentMax"],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeValues: (value) => {
            dispatch({
                type:"UPDATE_FILTER",
                name:ownProps["name"],
                value:value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeFilter);