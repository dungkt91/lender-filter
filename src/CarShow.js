import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const CarShow = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <CarShowClass isBigScreen={mdUp} />
}

class CarShowClass extends React.Component{
    constructor() {
        super();

        this.state = {
            carShowElements:[]
        }

        for(let i = 0; i < 20; i++){
            this.state.carShowElements.push(
                <Grid item xs={12}>
                    <CarShowElement />
                </Grid>
            );
        }
    }

    render(){
        return (
            <Grid container spacing={4} style={{height:this.props.isBigScreen?"90vh":"100%", overflow:"scroll"}}>
                {this.state.carShowElements}
            </Grid>
        );
    }
}

export default CarShow;