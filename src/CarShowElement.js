import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CarDescription from "./CarDescription";
import CarCalculation from "./CarCalculation";
import CarImagesGallery from "./CarImagesGallery";
import CarShowElementButtons from "./CarShowElementButtons";
import Grid from "@material-ui/core/Grid";

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

    convertToCarDetails(carJson){
        let result = [];

        for(let key in carJson){
            if (!this.excludeCarDetailFields(key)){
                result.push({
                    name:this.convertFieldNameToLabel(key).toUpperCase(),
                    value:carJson[key]
                });
            }
        }

        return result;
    }

    render() {
        return (
           <Card style={{width:"100%"}}>
               <CardContent>
                   <Grid container spacing={2}>
                       <Grid item xs={12} lg={7}>
                            <CarImagesGallery images={this.props.images}/>
                       </Grid>
                       <Grid item xs={12} lg={5}>
                           <CarDescription details={this.convertToCarDetails(this.props.details)}/>
                       </Grid>
                       <Grid item xs={12}>
                           <CarCalculation filtersInputs={this.props.filtersInputs} lenderData={this.props.lenderData} details={this.props.details}/>
                       </Grid>
                       <Grid item xs={12}>
                           <CarShowElementButtons />
                       </Grid>
                   </Grid>
               </CardContent>
           </Card>
        )
    }
}