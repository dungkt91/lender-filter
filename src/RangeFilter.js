import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";

class RangeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "min":"",
            "max":""
        }
    }

    textFieldOnChange(event, textFieldName){
        let newState = {};

        newState[textFieldName] = event.target.value;

        this.setState(newState);
    }

    getMin(){
        return this.state.min;
    }

    getMax(){
        return this.state.max;
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
                <Grid item xs={4}>
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