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
            filters:[]
        }
    }

    handleChange(event, newSelectedTabIndex){
        this.setState({selectedTabIndex:newSelectedTabIndex});
    }

    componentWillReceiveProps(nextProps){
        let makes = new Set();
        let makeToModelsDict = {}
        let models = new Set();

        for(let i = 0; i < nextProps.carDetails.length; i++){
            let carDetail = nextProps.carDetails[i];
            let make = carDetail["make"];
            let model = carDetail["model"];

            makes.add(make);
            models.add(model);
            if (!(make in makeToModelsDict)){
                makeToModelsDict[make] = new Set();
                makeToModelsDict[make].add(model);
            }
        }

        let filters = [
                {
                    "title":"Make",
                    "type":"list",
                    "options":Array.from(makes)
                },
                {
                    "title":"Model",
                    "type":"list",
                    "dependent_filter":"Make",
                    "dependent_list": makeToModelsDict,
                    "options":Array.from(models)
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
        ];

        this.setState({filters:filters});
    }

    render(){
        return (
        <React.Fragment>
            <Tabs value={this.state.selectedTabIndex} onChange={this.handleChange}>
                <Tab label={"Filter"} className={this.state.selectedTabIndex==0?"tab_selected":"tab_deselected"}/>
                <Tab label={"Lender"} className={this.state.selectedTabIndex==1?"tab_selected":"tab_deselected"} />
            </Tabs>
            <div className={this.state.selectedTabIndex==0?'':'hide'}>
                <Filter filters={this.state.filters}/>
            </div>
            <div className={this.state.selectedTabIndex==1?'':'hide'}>
                <Lender lenders={['Lender 1', 'Lender 2']} />
            </div>
        </React.Fragment>
        );
    }
}

export default LeftPanel;