import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";

export default class CarShow extends React.Component{
    constructor() {
        super();

        this.state = {
            carShowElements:[]
        }

        for(let i = 0; i < 20; i++){
            this.state.carShowElements.push(
                <Grid item xs={12} md={6}>
                    <CarShowElement />
                </Grid>
            );
        }
    }

    render(){
        return (
            <Grid container spacing={4} style={{maxHeight:"94vh", overflow:"scroll"}}>
                {this.state.carShowElements}
            </Grid>
        );
    }
}