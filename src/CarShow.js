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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
            <Grid item xs={6}>
                <span class={"matches"}>{this.state.carDetails.length + " matches"}</span>
            </Grid>
            <Grid item xs={6} align={"right"}>
                <span className={"sortBy"}>Sort by</span>
                <Select>
                    <MenuItem>Lowest Price</MenuItem>
                    <MenuItem>Highest Price</MenuItem>
                    <MenuItem>Lowest Mileage</MenuItem>
                    <MenuItem>Highest Mileage</MenuItem>
                    <MenuItem>Newest Year</MenuItem>
                    <MenuItem>Oldest Year</MenuItem>
                </Select>
            </Grid>
            {this.state.carDetails.map(carDetail => (
               <Grid item xs={12} md={4} lg={3}>
                   <Car details={carDetail}/>
               </Grid>
            ))}
        </Grid>);
    }
}

export default CarShow;