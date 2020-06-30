import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ImageGallery from "react-image-gallery";
import './Car.css';

class Car extends React.Component {
    constructor(props) {
        super(props);
    }

    getCarTitle(){
        let carYear = this.props.details['year'];
        let carMake = this.props.details['make'];
        let carModel = this.props.details['model'];
        let carTrim = this.props.details['trim'];

        return `${carYear} ${carMake} ${carModel} ${carTrim}`;
    }

    convertImages(images){
        return images.map(image => {return {original:image}});
    }

    render(){
        let carImgSrc = '';
        let detailsImages = this.props.details["images"];

        if (detailsImages && detailsImages.length > 0){
            carImgSrc = detailsImages[0]["src"];
        }

        return (
            <Card className={"car " + this.props.size} onClick={(event) => {
                if(this.props.onClick)
                    this.props.onClick(event, this.props.details)
            }}>
                <CardMedia>
                    <img src={carImgSrc} style={{width:'100%'}}/>
                </CardMedia>
                <CardContent>
                    <Grid container>
                        {this.props.size == 'sm'
                            ?(
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                    <span className={"car_total_cost"}>${this.props.details['total_cost']}</span>
                                </Grid>
                            ):(
                                <>
                                    <Grid item xs={12}>
                                        <span className={"car_title"}>{this.getCarTitle()}</span>
                                    </Grid>
                                    <Grid container className={"price_mileage_row"}>
                                        <Grid item xs={6}>
                                            <span className={"car_total_cost"}>${this.props.details['total_cost']}</span>
                                        </Grid>
                                        <Grid item xs={6} align={"right"}>
                                            <span className={"car_mileage"}>{this.props.details['mileage']} mi.</span>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default Car;