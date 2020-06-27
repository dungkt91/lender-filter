import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import debounce from "lodash/debounce";
import Slider from '@material-ui/core/Slider';

class RangeFilter extends React.Component {
    constructor(props) {
        super(props);

        let min = "";
        let max = "";

        if (this.props.value_type == "discrete"){
            min = Math.min(...this.props.values);
            max = Math.max(...this.props.values);
        } else if (this.props.value_type == "continuous"){
            min = this.props.values[0];
            max = this.props.values[1];
        }

        this.state = {
            "min":min,
            "max":max,
            "current_min":min,
            "current_max":max
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

        newState[textFieldName] = event.target.value;

        this.setState(newState);
        this.onChangeDebounced();
    }

    onChangeDebounced = () => {
        this.props.onChange();
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
        this.setState({current_min:values[0], current_max:values[1]});
        this.onChangeDebounced();
    }

    render(){
        return (
            <Grid container style={{padding:20}}>
                <Grid item xs={4}>
                    <TextField value={this.state["current_min"]} label={this.getMinTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "current_min")}/>
                </Grid>
                <Grid item xs={4} align={"center"}>
                    {this.getToText()}
                </Grid>
                <Grid item xs={4}>
                    <TextField value={this.state["current_max"]} label={this.getMaxTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "current_max")}/>
                </Grid>
                <Slider min={this.state.min} max={this.state.max} value={[this.state.current_min, this.state.current_max]} valueLabelDisplay="auto" step={1} onChange={this.sliderOnChange}/>
            </Grid>
        )
    }
}

export default RangeFilter;