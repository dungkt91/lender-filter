import React from 'react';
import {Checkbox} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

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

    getTitle(){
        return this.props.title;
    }

    getSelectedOptions(){
        let selectedOptions = [];

        for (let option of this.props.options){
            if (this.state[option]){
                selectedOptions.push(option);
            }
        }

        return selectedOptions;
    }

    componentWillReceiveProps(nextProps){
        let optionsChanged = nextProps.options.length != this.props.options.length;

        if(optionsChanged) {
            let newState = {};

            newState['Select All'] = true;

            for (let option of nextProps.options) {
                newState[option] = true;
            }

            this.setState({...newState});
        }
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
            <Grid container>
                <Grid item xs={12}>
                    <Checkbox checked={this.state['Select All']} color={"primary"} onChange={this.selectAll} />All
                </Grid>
                {
                    sortedOptions.map(item => (
                        <Grid item xs={manyOptions?6:12}>
                            <Checkbox checked={this.state[item]} color={"primary"}
                                      onChange={(event) => this.optionOnchange(event, item)}/>{item}
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}

export default ListFilter;