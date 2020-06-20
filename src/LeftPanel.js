import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Filter from './Filter';
import './LeftPanel.css';
import Lender from './Lender';

class LeftPanel extends React.Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        let filter =
        this.state = {
            selectedTabIndex:0,
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
            <div className={this.state.selectedTabIndex==0?'':'hide'}>
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
                        }]}
                        />
            </div>
            <div className={this.state.selectedTabIndex==1?'':'hide'}>
                <Lender lenders={['Lender 1', 'Lender 2']} />
            </div>
        </React.Fragment>
        );
    }
}

export default LeftPanel;