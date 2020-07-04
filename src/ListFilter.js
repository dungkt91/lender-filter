import React from 'react';
import {Checkbox} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './ListFilter.css';
import {connect} from "react-redux";

class ListFilter extends React.Component{
    constructor(props) {
        super(props);

        let selectAll = this.props.options.length == this.props.selectedOptions.length;
        let optionCheckedDict = {};

        for(let selectedOption of this.props.selectedOptions){
            optionCheckedDict[selectedOption] = true;
        }

        this.state = {
            select_all: selectAll,
            ...optionCheckedDict
        };

        this.selectAll = this.selectAll.bind(this);
        this.optionOnchange = this.optionOnchange.bind(this);
    }

    getValues(){
        let selectedOptions = [];

        for (let option of this.props.options){
            if (this.state[option]){
                selectedOptions.push(option);
            }
        }

        return {"selectedOptions":selectedOptions};
    }

    selectAll(event){
        let selectAllCheckbox = event.target;
        let selectedCheckboxState = selectAllCheckbox.checked;
        let newState = {...this.state};

        for(let option of this.props.options){
            if (selectAllCheckbox.checked){
                newState[option] = true;
            }else {
                newState[option] = false;
            }
        }

        newState.select_all = selectedCheckboxState;
        this.setState(newState, () => {
            this.props.onChange(this.getValues())
        });
    }

    optionOnchange(event, name){

        let checkbox = event.target;
        let newState = {...this.state};
        newState[name] = checkbox.checked;

        let selectAll = true;

        for(let option of this.props.options){
            if(!newState[option]){
                selectAll = false;
            }
        }

        newState.select_all = selectAll;

        this.setState(newState, () => {
            this.props.onChange(this.getValues())
        });
        console.log((checkbox.checked?'Check ':'Unchecked ') + name);
    }

    render(){
        let sortedOptions = [...this.props.options];
        sortedOptions.sort();

        let manyOptions = sortedOptions.length > 10;

        return (
            <Grid container className={'item_wrapper ' + (manyOptions?'many_options':'')}>
                <Grid item xs={12}>
                    <Checkbox checked={this.state.select_all} color={"primary"} onChange={this.selectAll} />All
                </Grid>
                {
                    sortedOptions.map(item => (
                        <Grid item xs={12}>
                            <Checkbox checked={this.state[item]} color={"primary"}
                                      onChange={(event) => this.optionOnchange(event, item)}/>
                            {this.props.titleTransformFunc?this.props.titleTransformFunc(item):item}
                            {this.props.displayCount?<span className={"filter_item_count"}>  ({this.props.counts[item]})</span>:null}
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let filter = state.filters[ownProps["name"]];

    return {
        options:filter["options"],
        displayCount:filter["displayCount"],
        counts:filter["counts"],
        selectedOptions:filter["selectedOptions"]
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

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);