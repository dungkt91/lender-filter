import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CarDescription from "./CarDescription";
import CarCalculation from "./CarCalculation";
import CarImagesGallery from "./CarImagesGallery";
import CarShowElementButtons from "./CarShowElementButtons";
import Grid from "@material-ui/core/Grid";
import Utils from './Utils';

export default class CarShowElement extends React.Component{
    excludeCarDetailFields(fieldName){
        let excludedFields = ['id', 'images', 'img_url', 'x_clean', 'clean', 'average', 'rough', 'series'];

        return excludedFields.includes(fieldName);
    }

    convertFieldNameToLabel(fieldName){
        let convertDict = {
            'total_cost': 'TOTAL COST'
        }

        if (fieldName in convertDict){
            return convertDict[fieldName];
        }

        return fieldName
    }

    isCurrencyField(fieldName){
        return ['total_cost'].includes(fieldName);
    }
    convertToCarDetails(carJson){
        let result = [];
        let currencySymbol = '$';

        for(let key in carJson){
            if (!this.excludeCarDetailFields(key)){
                let name = this.convertFieldNameToLabel(key).toUpperCase();
                let value = carJson[key];

                if (this.isCurrencyField(key)){
                    value = currencySymbol + value;
                }

                result.push({
                    name: name,
                    value: value
                });
            }
        }

        return result;
    }

    convertToImages(carDetail){
        console.log(carDetail);
        let carDetailsImages = carDetail["images"];
        Utils.sortImages(carDetailsImages);
        let images = [];

        for(let image of carDetailsImages){
            images.push({original:image["src"], thumbnail:image["src"]});
        }

        return images;
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} lg={7} style={{display: 'flex', justifyContent:"center", alignItems: "center"}}>
                    <CarImagesGallery images={this.convertToImages(this.props.details)}/>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <CarDescription details={this.convertToCarDetails(this.props.details)}/>
                </Grid>
                <Grid item xs={12}>
                    <CarCalculation filtersInputs={this.props.filtersInputs} lenderData={this.props.lenderData}
                                    details={this.props.details}/>
                </Grid>
            </Grid>
        )
    }
}