import * as React from "react";
import Grid from "@material-ui/core/Grid";
import NewCarImages from "./NewCarImages";
import NewCarDescription from "./NewCarDescription";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import './NewCar.css';

class NewCar extends React.Component {
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

    capitalizeFirstLetter(str){
        return str[0].toUpperCase() + str.slice(1);
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
                    title: this.capitalizeFirstLetter(this.convertFieldNameToLabel(key)),
                    value: value
                });
            }
        }

        return result;
    }

    render() {
        return (
            <div className={'car'}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <NewCarImages images={this.props.images}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <NewCarDescription details={this.convertToCarDetails(this.props.details)}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default NewCar;