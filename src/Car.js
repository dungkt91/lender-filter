import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import ImageGallery from "react-image-gallery";
import { withRouter } from "react-router";

class Car extends React.Component {
    constructor(props) {
        super(props);

        this.cardOnClick = this.cardOnClick.bind(this);
    }

    getCarTitle(){
        let carYear = this.props.details['year'];
        let carMake = this.props.details['make'];
        let carModel = this.props.details['model'];
        let carTrim = this.props.details['trim'];

        return `${carYear} ${carMake} ${carModel} ${carTrim}`;
    }

    cardOnClick(){
        const {history} = this.props;

        history.push('/car', {carDetails:this.props.details})
    }

    convertImages(images){
        return images.map(image => {return {original:image}});
    }

    render(){
        let carImages = [];
        let detailsImages = this.props.details["images"];

        if (detailsImages && detailsImages.length > 0){
            let firstCarImage = detailsImages[0];

            carImages = [{original:firstCarImage["src"]}];
        }

        return (
            <Card className={"car"} onClick={this.cardOnClick}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <ImageGallery items={carImages} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}/>
                        </Grid>
                        <Grid item xs={12}>
                            <span className={"car_title"}>{this.getCarTitle()}</span>
                        </Grid>
                        <Grid item xs={6}>
                            <span className={"car_total_cost"}>${this.props.details['total_cost']}</span>
                        </Grid>
                        <Grid item xs={6} align={"right"}>
                            <span className={"car_mileage"}>{this.props.details['mileage']} mi.</span>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(Car);