import * as React from "react";
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
import Loader from './Loader';
import { withRouter } from "react-router";

class CarShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortOptionIndex:0
        }

        this.selectSortOption = this.selectSortOption.bind(this);
        this.carOnClick = this.carOnClick.bind(this);
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

    reverseNumberSign(number){
        return -number;
    }

    sortCarDetails(carDetails, sortOptionIndex){
        switch(sortOptionIndex){
            case 1:
                carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.total_cost) - parseInt(carDetail2.total_cost));
                break;
            case 2:
                carDetails.sort((carDetail1, carDetail2) => this.reverseNumberSign(parseInt(carDetail1.total_cost) - parseInt(carDetail2.total_cost)));
                break;
            case 3:
                carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.mileage) - parseInt(carDetail2.mileage));
                break;
            case 4:
                carDetails.sort((carDetail1, carDetail2) => this.reverseNumberSign(parseInt(carDetail1.mileage) - parseInt(carDetail2.mileage)));
                break;
            case 5:
                carDetails.sort((carDetail1, carDetail2) => this.reverseNumberSign(parseInt(carDetail1.year) - parseInt(carDetail2.year)));
                break;
            case 6:
                carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.year) - parseInt(carDetail2.year));
                break;
        }

        return carDetails;
    }

    carDetails(){
        let filterValuesLength = Object.keys(this.props.filterValues).length;
        let hasFilterValues = filterValuesLength > 0;
        let carDetails = [...this.props.carDetails];

        if (hasFilterValues) {


            for(let filterTitle in this.props.filterValues){
                let filterValue = this.props.filterValues[filterTitle];
                let filterType = filterValue["type"];
                let filterFieldName = this.filterTitleToFieldName(filterTitle);

                if (filterType == "list"){
                    let selectedOptions = filterValue["selectedOptions"];
                    let selectedOptionsSet = new Set(selectedOptions);

                    carDetails = carDetails.filter(carDetail => selectedOptionsSet.has(carDetail[filterFieldName]));
                }else if(filterType == "range"){
                    let minVal = filterValue["min"];
                    let maxVal = filterValue["max"];

                    if (minVal !== "" || maxVal != "") {
                        if (minVal == "") {
                            minVal = 0;
                        }

                        if (maxVal == "") {
                            maxVal = Number.MAX_SAFE_INTEGER;
                        }

                        carDetails = carDetails.filter(carDetail => carDetail[filterFieldName] >= minVal && carDetail[filterFieldName] <= maxVal);
                    }
                }
            }

            // Sort
            if (this.state.sortOptionIndex != -1){
                carDetails = this.sortCarDetails(carDetails, this.state.sortOptionIndex);
            }

            return carDetails;
        }else{
            // Sort
            if (this.state.sortOptionIndex != -1){
                carDetails = this.sortCarDetails(carDetails, this.state.sortOptionIndex);
            }

            return carDetails;
        }
    }

    selectSortOption(event){
        let sortOptionIndex = event.target.value;

        this.setState({sortOptionIndex:sortOptionIndex});
    }

    carOnClick(event, carDetails, carIndex){
        const {history} = this.props;

        history.push('/car', {carDetails:carDetails, results:this.carDetails(), carIndex: carIndex});
    }

    render() {
        let carDetailsAfterFilterAndSort = this.carDetails();

        return (
            <>
                {/*<Loader timeout={500}>*/}
                    <Grid container spacing={2} className={"carshow"}>
                    <Grid item xs={6} style={{paddingTop:20}}>
                        <span className={"matches"}>{carDetailsAfterFilterAndSort.length + " matches"}</span>
                    </Grid>
                    <Grid item xs={6} align={"right"}>
                        <Select className={"sort_by_select_option"} value={this.state.sortOptionIndex} onChange={this.selectSortOption}>
                            <MenuItem value={0}>Sort By</MenuItem>
                            <MenuItem value={1}>Lowest Price</MenuItem>
                            <MenuItem value={2}>Highest Price</MenuItem>
                            <MenuItem value={3}>Lowest Mileage</MenuItem>
                            <MenuItem value={4}>Highest Mileage</MenuItem>
                            <MenuItem value={5}>Newest Year</MenuItem>
                            <MenuItem value={6}>Oldest Year</MenuItem>
                        </Select>
                    </Grid>
                    {carDetailsAfterFilterAndSort.map((carDetail, index) => (
                       <Grid item xs={12} md={4} lg={3}>
                           <Car details={carDetail} onClick={(event, carDetails) => this.carOnClick(event, carDetails, index)}/>
                       </Grid>
                    ))}
                    </Grid>
                {/*</Loader>*/}
            </>
        );
    }
}

export default withRouter(CarShow);