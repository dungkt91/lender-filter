import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import "./ListFilter.css";

class ListFilter extends React.Component {
    constructor(props) {
        super(props);

        this.changeCheckboxState = this.changeCheckboxState.bind(this);
        this.checkAllCheckbox = this.checkAllCheckbox.bind(this);
    }

    changeCheckboxState(event, option){
        let state = event.target.checked;
        let newSelectedOptions = [...this.props.selectedOptions];

        if(state){
            newSelectedOptions.push(option);
        }else{
            const index = newSelectedOptions.indexOf(option);

            if(index > -1){
                newSelectedOptions.splice(index, 1);
            }
        }

        this.props.updateFilter(newSelectedOptions);
    }

    checkAllCheckbox(event){
        let state = event.target.checked;

        if(state)
            this.props.updateFilter([...this.props.options]);
        else
            this.props.updateFilter([]);
    }

    getCount(option){
        if(this.props.counts){
            return " (" + this.props.counts[option] + ")";
        }

        return "";
    }

    getCheckboxLabel(option){
        if(this.props.titleTransformFunc){
            return this.props.titleTransformFunc(option);
        }

        return option;
    }

    render(){
        let selectAll = this.props.options.length == this.props.selectedOptions.length;
        let sortOptions = this.props.options;
        sortOptions.sort()

        let classNameVal = "list_filter";
        if (this.props.screenData["mdUp"] && this.props.options.length > 10){
            classNameVal += " aLotOfOptions";
        }

        return (
            <>
                <Grid container className={classNameVal}>
                    {sortOptions.length > 0?
                        (
                            <Grid item xs={12}>
                                <Checkbox color="primary" checked={selectAll} onChange={this.checkAllCheckbox}/>All
                            </Grid>
                        ):null
                    }
                    {sortOptions.map(option => {
                        let isSelected = this.props.selectedOptions.includes(option);

                        return (
                            <Grid item xs={12}>
                                <Checkbox color="primary" checked={isSelected} onChange={(event) => this.changeCheckboxState(event, option)}/>{this.getCheckboxLabel(option)}{this.getCount(option)}
                            </Grid>
                        )
                    })}
                </Grid>
            </>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    let filter = state["filters"][ownProps["name"]];

    return {
        options: filter["options"],
        selectedOptions: filter["selectedOptions"],
        counts:filter["counts"],
        screenData:state["screenData"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateFilter: (selectedOptions) => {
            dispatch({
                type:"UPDATE_FILTER",
                name:ownProps["name"],
                value:{
                    "selectedOptions":selectedOptions
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);