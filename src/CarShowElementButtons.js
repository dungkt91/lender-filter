import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default class CarShowElementButtons extends React.Component{
    render(){
        return <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Button variant="contained" color={"primary"} style={{width:"100%"}}>Save</Button>
                </Grid>
                <Grid item item xs={3}>
                    <Button variant="contained" color={"primary"} style={{width:"100%"}}>Pictures</Button>
                </Grid>
                <Grid item item xs={3}>
                    <Button variant="contained" color={"primary"} style={{width:"100%"}}>Breakdown</Button>
                </Grid>
                <Grid item item xs={3}>
                    <Button variant="contained" color={"primary"} style={{width:"100%"}}>Send</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}