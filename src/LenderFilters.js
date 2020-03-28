import LenderFilter from "./LenderFilter";
import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default class LendersFilter extends React.Component{
    constructor() {
        super();
        this.clearFiltersOnClick = this.clearFiltersOnClick.bind(this);
        this.lenderFilter1 = React.createRef();
        this.lenderFilter2 = React.createRef();
        this.lenderFilter3 = React.createRef();
    }

    clearFiltersOnClick(event){
        this.lenderFilter1.current.reset();
        this.lenderFilter2.current.reset();
        this.lenderFilter3.current.reset();
    }

    render(){
        return (
            <React.Fragment>
                <Grid container direction={"row"} spacing={4} style={{padding:"10px"}}>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Button variant="contained" color={"secondary"} onClick={this.clearFiltersOnClick}>Clear Filters</Button>
                    </Grid>
                    <Grid item xs={12}>
                        Customer Name:
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter1}/>
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter2}/>
                    </Grid>
                    <Grid item xl={4}>
                        <LenderFilter ref={this.lenderFilter3}/>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}