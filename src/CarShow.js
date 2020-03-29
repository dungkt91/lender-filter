import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

class CarShow extends React.Component{
    constructor() {
        super();

        this.state = {
            carShowElements:[]
        }

        for(let i = 0; i < 20; i++){
            this.state.carShowElements.push(
                <Grid item xs={12} lg={6}>
                    <CarShowElement />
                </Grid>
            );
        }
    }

    render(){
        return (
            <Grid container spacing={4}>
                {this.state.carShowElements}
            </Grid>
        );
    }
}

export default CarShow;