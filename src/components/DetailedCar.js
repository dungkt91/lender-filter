import React from "react";
import { Card } from '@material-ui/core';
import Utils from "../Utils";
import CardContent from '@material-ui/core/CardContent';
import "./DetailedCar.css";
import Grid from '@material-ui/core/Grid';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CarCalculation from "./CarCalculation";
import {connect} from "react-redux";

class DetailedCar extends React.Component {
    getTitle(){
        let carYear = this.props.details['year'];
        let carMake = this.props.details['make'];
        let carModel = this.props.details['model'];
        let carTrim = this.props.details['trim'];

        return Utils.convertStr(`${carYear} ${carMake} ${carModel} ${carTrim}`);
    }

    keyToTitle(key){
        if (key == "total_cost")
            return "total cost";

        return key;
    }

    render(){
        let carImages = this.props.details["images"];
        let displayedFields = ["title", "make", "model", "series", "style", "drive", "fuel", "mileage", "vin", "trim", "color", "total_cost"];

        if(carImages.length > 0){
            Utils.sortImages(carImages);
        }

        let carImagesToImageGallery = carImages.map(carImage => {return {original:carImage["src"], thumbnail:carImage["src"]}});

        return (
            <Card className={"detailed_car"}>
                <CardContent>
                    <Grid container>
                        <Grid item md={6} xs={12} className={"car_images"}>
                            <ImageGallery items={carImagesToImageGallery} showPlayButton={false}/>
                        </Grid>
                        <Grid item md={6} xs={12} className={"car_description " + (this.props.screenData["mdUp"]?"paddingLeft20Important":"")}>
                            <Grid container>
                                <Grid item md={12} xs={12}  className={"car_title"}>
                                    {this.getTitle()}
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <Table>
                                        <TableBody>
                                            {
                                                displayedFields.map(infoName => {
                                                    return (<TableRow>
                                                        <TableCell className={"car_description_value_name"}>{Utils.convertStr(this.keyToTitle(infoName))}</TableCell>
                                                        <TableCell>{this.props.details[infoName]}</TableCell>
                                                    </TableRow>);
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <CarCalculation details={this.props.details}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        screenData:state["screenData"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCar);
