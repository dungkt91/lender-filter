import React from 'react';
import {Checkbox} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './ListFilter.css';

class ListFilter extends React.Component{
    constructor(props) {
        super(props);
        let optionCheckedDict = {};

        for(let option of this.props.options){
            optionCheckedDict[option] = true;
        }

        this.state = {
            'Select All': true,
            ...optionCheckedDict
        };

        this.selectAll = this.selectAll.bind(this);
        this.optionOnchange = this.optionOnchange.bind(this);
    }

    componentDidMount() {
        if(this.props.init){
            let newState = {...this.state};

            let checkedAll = true;

            for(let option of this.props.options){
                let isChecked = this.props.init.includes(option);
                newState[option] = isChecked;

                if(!isChecked) {
                    checkedAll = false;
                }
            }

            newState['Select All'] = checkedAll;

            this.setState(newState, this.props.onChange);
        }
    }

    getTitle(){
        return this.props.title;
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

        newState['Select All'] = selectedCheckboxState;
        this.setState(newState, this.props.onChange);
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

        newState['Select All'] = selectAll;

        this.setState(newState, this.props.onChange);
        console.log((checkbox.checked?'Check ':'Unchecked ') + name);
    }

    render(){
        let sortedOptions = [...this.props.options];
        sortedOptions.sort();

        let manyOptions = sortedOptions.length > 10;

        return (
            <Grid container className={'item_wrapper ' + (manyOptions?'many_options':'')}>
                <Grid item xs={12}>
                    <Checkbox checked={this.state['Select All']} color={"primary"} onChange={this.selectAll} />All
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

export default ListFilter;