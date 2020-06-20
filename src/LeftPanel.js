import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Filter from './Filter';
import './LeftPanel.css';

class LeftPanel extends React.Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedTabIndex:0
        }
    }

    handleChange(event, newSelectedTabIndex){
        this.setState({selectedTabIndex:newSelectedTabIndex});
    }

    render(){
        return (
        <React.Fragment>
            <Tabs value={this.state.selectedTabIndex} onChange={this.handleChange}>
                <Tab label={"Filter"} className={this.state.selectedTabIndex==0?"tab_selected":"tab_deselected"}/>
                <Tab label={"Lender"} className={this.state.selectedTabIndex==1?"tab_selected":"tab_deselected"} />
            </Tabs>
            {this.state.selectedTabIndex == 0?
                <Filter
                filters={[
                    {
                        "title":"Make",
                        "type":"list",
                        "options":["Make 1", "Make 2"]
                    },
                    {
                        "title":"Model",
                        "type":"list",
                        "options":["Model 1", "Model 2"]
                    },
                    {
                        "title":"Year",
                        "type":"range",
                        "minTitle":"Min",
                        "maxTitle":"Max"
                    },
                    {
                        "title":"Mileage",
                        "type":"range",
                        "minTitle":"Min",
                        "maxTitle":"Max"
                    },
                    {
                        "title":"Total cost",
                        "type":"range",
                        "minTitle":"Min",
                        "maxTitle":"Max"
                    }
            ]} />:null}
        </React.Fragment>
        );
    }
}

export default LeftPanel;