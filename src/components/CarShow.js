import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Car from "./Car";
import "./CarShow.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import MenuIcon from '@material-ui/icons/Menu';
import DetailedCar from "./DetailedCar";
import LazyLoad from 'react-lazyload';
import LoaderWrapper from "./LoaderWrapper";
import { withRouter } from "react-router";

class CarShow extends React.Component {
    constructor(props) {
        super(props);

        this.sortByIndexChange = this.sortByIndexChange.bind(this);
        this.viewTypeChange = this.viewTypeChange.bind(this);
        this.carClick = this.carClick.bind(this);
    }

    sortByIndexChange(event){
        this.props.sortBySelect(event.target.value);
    }

    viewTypeChange(index){
        this.props.changeViewType(index);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loadDataFinished)
            this.props.loading(false);
    }

    carClick(carIndex){
        const {history} = this.props;

        history.push('/car', {carIndex: carIndex});
    }

    render(){
        let gridView = this.props.viewTypeIndex == 0;
        return (
            <Grid container className={"car_show " + (this.props.screenData["mdUp"]?"big_screen":"small_screen")}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6} className={"item_match_count"}>
                            {this.props.carDetails.length} matches
                        </Grid>
                        <Grid item xs={6} className={"sort_by_wrapper"}>
                            <IconButton onClick={(event) => this.viewTypeChange(0)} className={"view_type grid " + ((this.props.viewTypeIndex == 0)?"active":"deactive")}><ViewComfyIcon /></IconButton>
                            <IconButton onClick={(event) => this.viewTypeChange(1)} className={"view_type list " + ((this.props.viewTypeIndex == 1)?"active":"deactive")}><MenuIcon /></IconButton>
                            <Select value={this.props.sortOptionIndex} className={"sort_by"} onChange={this.sortByIndexChange}>
                                <MenuItem value={0}>Sort By</MenuItem>
                                <MenuItem value={1}>Lowest Price</MenuItem>
                                <MenuItem value={2}>Highest Price</MenuItem>
                                <MenuItem value={3}>Lowest Mileage</MenuItem>
                                <MenuItem value={4}>Highest Mileage</MenuItem>
                                <MenuItem value={5}>Newest Year</MenuItem>
                                <MenuItem value={6}>Oldest Year</MenuItem>
                                <MenuItem value={7}>Highest Profit</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    (!this.props.isLoading)?(
                    gridView?(
                            this.props.carDetails.map((carDetail, carIndex) => {
                                return <Grid item md={3} xs={12} className={"car_wrapper"}>
                                    <LazyLoad height={100} offset={100} once><Car details={carDetail} onClick={() => this.carClick(carIndex)}/></LazyLoad>
                                </Grid>
                            })
                        ):(
                        this.props.carDetails.map((carDetail, carIndex) => {
                            return <Grid xs={12} className={"car_wrapper"}>
                                <LazyLoad height={500} offset={100} once><DetailedCar details={carDetail} onClick={() => this.carClick(carIndex)} /></LazyLoad>
                            </Grid>
                        })
                    )
                    ):(
                        <div className={"loader_wrapper"}>
                            <LoaderWrapper />
                        </div>
                        )
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        carDetails: state["postProcessingCarDetails"],
        sortOptionIndex: state["sortOptionIndex"],
        viewTypeIndex:state["viewTypeIndex"],
        isLoading:state["isLoading"],
        loadDataFinished:state["loadDataFinished"],
        screenData:state["screenData"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sortBySelect : (sortByOptionIndex) => {
            dispatch({
                type:"SORT_BY_SELECTION",
                index:sortByOptionIndex
            })
        },
        changeViewType : (viewTypeIndex) => {
            dispatch({
                type:"CHANGE_VIEW_TYPE",
                index:viewTypeIndex
            })
        },
        loading:(value) => {
            dispatch({
                type:"LOADING",
                value: value
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarShow));