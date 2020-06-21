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

        this.state = {
            carDetails:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("Make" in nextProps.filterValues && "Model" in nextProps.filterValues) {
            console.log('Filter');
            let carDetails = [];

            for (let carDetail of nextProps.carDetails) {
                if (nextProps.filterValues["Make"].includes(carDetail["make"])) {
                    if (nextProps.filterValues["Model"].includes(carDetail["model"]))
                        carDetails.push(carDetail);
                }
            }

            this.setState({carDetails: carDetails});
        }else{
            this.setState({carDetails:nextProps.carDetails});
        }
    }

    render() {
        return (<Grid container spacing={2}>
            {this.state.carDetails.map(carDetail => (
               <Grid item xs={3}>
                   <Car details={carDetail}/>
               </Grid>
            ))}
        </Grid>);
    }
}

export default CarShow;