import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import debounce from "lodash/debounce";
import Slider from '@material-ui/core/Slider';
import InputAdornment from "@material-ui/core/InputAdornment";
import {connect} from "react-redux";

class RangeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "min":this.props.min,
            "max":this.props.max,
            "current_min":this.props.current_min,
            "current_max":this.props.current_max
        }

        this.onChangeDebounced = debounce(this.onChangeDebounced, 1000);
        this.sliderOnChange = this.sliderOnChange.bind(this);
    }

    componentDidMount(){
        if(this.props.init){
            this.setState({"current_min":this.props.init["min"], "current_max":this.props.init["max"]});
        }
    }

    textFieldOnChange(event, textFieldName){
        let newState = {};
        let newValue = event.target.value;
        newState[textFieldName] = newValue;

        this.setState(newState);
        let valueDict = {};
        valueDict[textFieldName] = newValue;

        this.onChangeDebounced(valueDict);
    }

    onChangeDebounced = (value) => {
        this.props.onChange(value);
    }

    getValues(){
        return {"min":this.state.current_min, "max":this.state.current_max};
    }

    getMinTitle(){
        return this.props.minTitle == undefined?"Min":this.props.minTitle;
    }

    getMaxTitle(){
        return this.props.maxTitle == undefined?"Max":this.props.maxTitle;
    }

    getToText(){
        return this.props.toText == undefined?"To":this.props.toText;
    }

    sliderOnChange(event, values){
        let valueDict = {current_min:values[0], current_max:values[1]};

        this.setState(valueDict);
        this.onChangeDebounced(valueDict);
    }

    render(){
        let inputProps = {};

        if (this.props.startAdornment){
            inputProps['startAdornment'] = <InputAdornment position="start">{this.props.startAdornment}</InputAdornment>
        }

        if (this.props.endAdornment){
            inputProps['endAdornment'] = <InputAdornment position="end">{this.props.endAdornment}</InputAdornment>
        }

        return (
            <Grid container style={{padding:20}}>
                <Grid item xs={4}>
                    <TextField value={this.state["current_min"]} label={this.getMinTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "current_min")}
                               InputProps={inputProps}
                    />
                </Grid>
                <Grid item xs={4} align={"center"} style={{paddingTop:10}}>
                    {this.getToText()}
                </Grid>
                <Grid item xs={4}>
                    <TextField value={this.state["current_max"]} label={this.getMaxTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "current_max")}
                               InputProps={inputProps}
                    />
                </Grid>
                <Slider min={this.state.min} max={this.state.max} value={[this.state.current_min, this.state.current_max]} valueLabelDisplay="auto" step={1} onChange={this.sliderOnChange}/>
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        min:state.filters[ownProps["name"]].min,
        max:state.filters[ownProps["name"]].max,
        current_min:state.filters[ownProps["name"]].current_min,
        current_max:state.filters[ownProps["name"]].current_max,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (value) => {
            let dict = {
                type:"UPDATE_FILTER",
                filter_name:ownProps["name"],
                value:value
            };

            dispatch(dict);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeFilter);