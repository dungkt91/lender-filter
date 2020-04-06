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
    }

    componentDidMount() {
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
                this.setState({carShowElements:carShowElements})
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
            <Grid container spacing={4}>
                {this.state.carShowElements}
            </Grid>
        );
    }
}

export default CarShow;