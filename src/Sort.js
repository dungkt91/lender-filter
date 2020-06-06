import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class Sort extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCriteriaIndex: 0
        }

        this.sortCriteriaList = ["Sort by (choose)",
                                "Year (Latest -> Newest)",
                                "Year (Newest -> Latest)",
                                "Make",
                                "Model",
                                "Mileage (Lowest -> Highest)",
                                "Mileage (Highest -> Lowest)",
                                "Cost (Lowest -> Highest)",
                                "Cost (Highest -> Lowest)",
                                "Profit (Lowest -> Highest)",
                                "Profit (Highest -> Lowest)"]
    }

    selectCriteriaAtIndex(index){
        this.setState(
            {selectedCriteriaIndex:index}
        )
    }

    getSelectedCriteriaIndex(){
        return this.state.selectedCriteriaIndex;
    }

    getSelectedCriteriaName(){
        return this.sortCriteriaList[this.state.selectedCriteriaIndex];
    }

    render(){
        return (
            <Select onChange={this.props.onSelect} value={this.state.selectedCriteriaIndex}>
                {
                    this.sortCriteriaList.map((sortCriteria, index) =>
                        <MenuItem value={index}>{sortCriteria}</MenuItem>
                    )
                }
            </Select>
        );
    }
}

export default Sort;