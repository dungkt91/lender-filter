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

    filterTitleToFieldName(filterTitle){
        let dict = {
            "Make":"make",
            "Model":"model",
            "Year":"year",
            "Total cost":"total_cost",
            "Mileage":"mileage"
        }

        return dict[filterTitle];
    }

    componentWillReceiveProps(nextProps) {
        let filterValuesLength = Object.keys(nextProps.filterValues).length;
        let hasFilterValues = filterValuesLength > 0;

        if (hasFilterValues) {
            let carDetails = [...nextProps.carDetails];

            for(let filterTitle in nextProps.filterValues){
                let filterValue = nextProps.filterValues[filterTitle];
                let filterType = filterValue["type"];
                let filterFieldName = this.filterTitleToFieldName(filterTitle);

                if (filterType == "list"){
                    let selectedOptions = filterValue["selectedOptions"];
                    let selectedOptionsSet = new Set(selectedOptions);

                    carDetails = carDetails.filter(carDetail => selectedOptionsSet.has(carDetail[filterFieldName]));
                }else if(filterType == "range"){
                    let minVal = filterValue["min"];
                    let maxVal = filterValue["max"];

                    if (minVal !== "" && maxVal != ""){
                        carDetails = carDetails.filter(carDetail => carDetail[filterFieldName] >= minVal && carDetail[filterFieldName] <= maxVal);
                    }
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