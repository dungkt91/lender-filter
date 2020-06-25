import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import debounce from "lodash/debounce";

class RangeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "min":"",
            "max":""
        }

        this.onChangeDebounced = debounce(this.onChangeDebounced, 2000);
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
        return {"min":this.state.min, "max":this.state.max};
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

    render(){
        return (
            <Grid container>
                <Grid item xs={4}>
                    <TextField value={this.state["min"]} label={this.getMinTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "min")}/>
                </Grid>
                <Grid item xs={4} align={"center"}>
                    {this.getToText()}
                </Grid>
                <Grid item xs={4}>
                    <TextField value={this.state["max"]} label={this.getMaxTitle()}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "max")}/>
                </Grid>
            </Grid>
        )
    }
}

export default RangeFilter;