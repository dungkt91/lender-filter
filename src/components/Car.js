import React from 'react';
import { Card } from '@material-ui/core';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from '@material-ui/core/CardContent';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Grid from '@material-ui/core/Grid';
import "./Car.css";
import Utils from "../Utils";

class Car extends React.Component {
    getTitle(){
        let carYear = this.props.details['year'];
        let carMake = this.props.details['make'];
        let carModel = this.props.details['model'];
        let carTrim = this.props.details['trim'];

        return Utils.convertStr(`${carYear} ${carMake} ${carModel} ${carTrim}`);
    }

    getProfit(){
        let maxProfit = Utils.getMaxProfit(this.props.details);

        if(maxProfit == Number.NEGATIVE_INFINITY){
            return "-";
        }

        return maxProfit;
    }

    render(){
        let carImgSrc = "";
        let carImages = this.props.details["images"];
        Utils.sortImages(carImages);

        if(carImages.length > 0){
            carImgSrc = carImages[0]["src"];
        }

        let carProfit = this.getProfit();
        let carProfitClass = "";

        if(carProfit != "-"){
            if(carProfit <= 0){
                carProfit = "-$" + -carProfit;
                carProfitClass = "negative";
            }else{
                carProfit = "$" + carProfit;
                carProfitClass = "positive";
            }
        }

        return (
        <Card className={"car"} onClick={(event) => {
            if(this.props.onClick)
                this.props.onClick(this.props.details);
        }}>
            <CardMedia className={"car_img"}>
                <img src={carImgSrc} style={{width: '100%'}}/>
            </CardMedia>
            <CardContent>
                <Grid container>
                    {this.props.size=="sm"?(
                        <Grid item xs={5} className={"car_price"}>
                            ${this.props.details["total_cost"]}
                        </Grid>
                        ): (
                            <>
                            <Grid item xs={12} className={"car_title"}>
                                {this.getTitle()}
                            </Grid>
                            <Grid item xs={3}>
                                Cost
                            </Grid>
                            <Grid item xs={5} className={"car_price"}>
                                ${this.props.details["total_cost"]}
                            </Grid>
                            <Grid item xs={4} className={"car_mileage"}>
                                {this.props.details["mileage"]} mil.
                            </Grid>
                            <Grid item xs={3}>
                                Profit
                            </Grid>
                            <Grid item xs={5} className={"car_profit " + carProfitClass}>
                                {carProfit}
                            </Grid>
                            <Grid item xs={4}>
                                Available|
                            </Grid>
                            </>
                            )
                    }
                </Grid>
            </CardContent>
        </Card>
        );
    }
}

export default Car;