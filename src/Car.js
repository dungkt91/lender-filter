import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import ImageGallery from "react-image-gallery";

class Car extends React.Component {
    getCarTitle(){
        let carYear = this.props.details['year'];
        let carMake = this.props.details['make'];
        let carModel = this.props.details['model'];
        let carTrim = this.props.details['trim'];

        return `${carYear} ${carMake} ${carModel} ${carTrim}`;
    }

    render(){
        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <ImageGallery items={[{original:"https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6"}]} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}/>
                        </Grid>
                        <Grid item xs={12}>
                            {this.getCarTitle()}
                        </Grid>
                        <Grid item xs={6}>
                            ${this.props.details['total_cost']}
                        </Grid>
                        <Grid item xs={6} align={"right"}>
                            {this.props.details['mileage']}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default Car;