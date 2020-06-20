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

    render(){
        return (
            <Grid container>
                <Grid item xs={6}>
                    <TextField value={this.state["min"]} label={this.props.minTitle}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "min")}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField value={this.state["max"]} label={this.props.maxTitle}
                               variant="outlined" size={"small"} onChange={(event) => this.textFieldOnChange(event, "max")}/>
                </Grid>
            </Grid>
        )
    }
}

export default RangeFilter;