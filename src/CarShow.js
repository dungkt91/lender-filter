import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {styled, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";
import './CarShow.css';

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
        this.setState({isLoading:true});
        fetch('https://lender-filter-backend-test.herokuapp.com/cars/')
            .then(res => res.json())
            .then(json => {
                let carShowElements = []

                for(let i = 0; i < json.length; i++){
                    let car_details = this.convertToCarDetails(json[i])
                    let car_images = this.getCarImages(json[i])

                    carShowElements.push(
                        <Grid item xs={12} xl={6}>
                            <CarShowElement details={car_details} images={car_images}/>
                        </Grid>
                    );
                }
                this.setState({carShowElements:carShowElements, isLoading:false});
            });
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

    convertToCarDetails(carJson){
        let result = [];

        for(let key in carJson){
            if (key != "id" && key != "images"){
                result.push({
                    name:key.toUpperCase(),
                    value:carJson[key]
                });
            }
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