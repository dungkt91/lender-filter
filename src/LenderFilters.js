import LenderFilter from "./LenderFilter";
import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {fetchLenderPrograms, fetchLenders, fetchLenderTerms} from "./Api";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default class LendersFilter extends React.Component{
    constructor() {
        super();
        this.clearFiltersOnClick = this.clearFiltersOnClick.bind(this);
        this.lenderFilter1 = React.createRef();
        this.lenderFilter2 = React.createRef();
        this.lenderFilter3 = React.createRef();

        this.state = {
            lenders: [],
            lenderPrograms: [],
            lenderTerms: []
        }

        Promise.all([fetchLenders(), fetchLenderPrograms(), fetchLenderTerms()]).then(async([lenders, lenderPrograms, lenderTerms]) => {
            const lendersJson = await lenders.json();
            const lenderProgramsJson = await lenderPrograms.json();
            const lenderTermsJson = await lenderTerms.json();

            return [lendersJson, lenderProgramsJson, lenderTermsJson];
        }).then(([lenders, lenderPrograms, lenderTerms]) => {
            this.setState({lenders:lenders, lenderPrograms:lenderPrograms, lenderTerms:lenderTerms});
        });
    }

    clearFiltersOnClick(event){
        this.lenderFilter1.current.reset();
        this.lenderFilter2.current.reset();
        this.lenderFilter3.current.reset();
    }

    getFiltersInputs(){
        return [this.lenderFilter1.current.state, this.lenderFilter2.current.state, this.lenderFilter3.current.state];
    }

    hasError(){
        return this.lenderFilter1.current.hasError() || this.lenderFilter2.current.hasError() || this.lenderFilter3.current.hasError();
    }

    getLenderData(){
        return [this.state.lenders, this.state.lenderPrograms, this.state.lenderTerms];
    }

    render(){
        return (
            <React.Fragment>
                <Grid container direction={"row"} spacing={4}>
                    <Grid item xs={12}>
                        Customer Name: <TextField variant="outlined" size={"small"}/>
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter1} lenders={this.state.lenders} lenderPrograms={this.state.lenderPrograms} lenderTerms={this.state.lenderTerms}/>
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter2} lenders={this.state.lenders} lenderPrograms={this.state.lenderPrograms} lenderTerms={this.state.lenderTerms}/>
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter3} lenders={this.state.lenders} lenderPrograms={this.state.lenderPrograms} lenderTerms={this.state.lenderTerms}/>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" onClick={this.props.submitOnClick}>Submit</Button>
                        <Button variant="contained" color={"secondary"} onClick={this.clearFiltersOnClick} style={{marginLeft:10}}>Reset</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}