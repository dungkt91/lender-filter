import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {styled, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";
import './CarShow.css';
import {fetchCars} from "./Api";
import InfiniteScroll from "react-infinite-scroller";
import {calculateProfitFirstInterest} from "./CarCalculation";
import Car from './Car.js';

const clipLoaderCss = css`
    border-color:rgb(55,71,172);
    position:absolute;
    border-bottom-color:transparent;
    top:50%;
`;

class CarShow extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<Grid container spacing={2}>
            {this.props.carDetails.map(carDetail => (
               <Grid item xs={3}>
                   <Car details={carDetail}/>
               </Grid>
            ))}
        </Grid>);
    }
}

export default CarShow;