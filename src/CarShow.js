import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {styled, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";
import './CarShow.css';
import {fetchCars} from "./Api";

const clipLoaderCss = css`
    border-color:rgb(55,71,172);
    position:absolute;
    border-bottom-color:transparent;
    top:50%;
`;

class CarShow extends React.Component{
    constructor() {
        super();

        this.state = {
            carShowElements:[],
            isLoading:false
        }
    }

    componentDidMount() {
        this.updateCars(this.props.filtersInputs, null);
    }

    updateCars(filtersInputs, lenderData){
        this.setState({isLoading:true});

        fetchCars()
            .then(res => res.json())
            .then(json => {
                let carShowElements = []

                for(let i = 0; i < json.length; i++){
                    let car_details = json[i]
                    let car_images = this.getCarImages(json[i])

                    carShowElements.push(
                        <Grid item xs={12} xl={6}>
                            <CarShowElement details={car_details} images={car_images} filtersInputs={filtersInputs} lenderData={lenderData}/>
                        </Grid>
                    );
                }
                this.setState({carShowElements:carShowElements, isLoading:false});
            });
    }

    componentWillReceiveProps(nextProps){
        this.updateCars(nextProps.filtersInputs, nextProps.lenderData);
    }

    getCarImages(carJson){
        let result = [];

        for(let i = 0; i < carJson["images"].length; i++){
            let image = carJson["images"][i];

            let imageSrc = image.src;
            console.log(imageSrc);

            result.push({
                original:imageSrc,
                thumbnail:imageSrc
            });
        }
        return result;
    }

    render(){
        return (
            <Grid container spacing={4} className={`car-show-grid ${this.state.isLoading?"loading":""}`}>
                {this.state.isLoading?<div className={"spinner"}><ClipLoader css={clipLoaderCss}/></div>:this.state.carShowElements}
            </Grid>
        );
    }
}

export default CarShow;