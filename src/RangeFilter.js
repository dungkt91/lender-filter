import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import debounce from "lodash/debounce";

class RangeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "min":"",
            "max":""
        }

        this.onChangeDebounced = debounce(this.onChangeDebounced, 2000);
        this.selectRange = this.selectRange.bind(this);
    }

    componentDidMount(){
        if(this.props.init){
            this.setState({"min":this.props.init["min"], "max":this.props.init["max"]});
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

    selectRange(event, min, max){
        this.setState({"min":min, "max":max}, this.props.onChange);
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
                {
                    this.props.rangeList?(<ul>{this.props.rangeList.map(range => {
                        if (range.length == 1){
                            return (<li><a href="#" onClick={(event) => this.selectRange(event, range[0], range[0])}>{range[0]}</a></li>);
                        }else if (range.length == 2){
                            return (<li><a href="#"  onClick={(event) => this.selectRange(event, range[0], range[1])}>{range[0]} - {range[1]}</a></li>);
                        }

                        return null;
                    })}</ul>):(null)
                }
            </Grid>
        )
    }
}

export default RangeFilter;