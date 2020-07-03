import React from 'react';
import Grid from "@material-ui/core/Grid";
import CarDescriptionNew from "./CarDescriptionNew";
import CarImagesNew from "./CarImagesNew";
import './CarNew.css';

class CarNew extends React.Component {
    createImages(images){
        return images.map(image => {
            return {original:image};
        });
    }

    render() {
        return (
                <Grid container className={"car_container"}>
                    <Grid item xs={12} sm={6}>
                        <CarImagesNew images={this.createImages(this.props.images)} />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{padding:15}}>
                        <CarDescriptionNew details={this.props.details}/>
                    </Grid>
                </Grid>
        );
    }
}

export default CarNew;