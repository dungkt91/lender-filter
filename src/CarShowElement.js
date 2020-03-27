import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CarDescription from "./CarDescription";
import CarCalculation from "./CarCalculation";
import CarImagesGallery from "./CarImagesGallery";
import CarShowElementButtons from "./CarShowElementButtons";
import Grid from "@material-ui/core/Grid";

export default class CarShowElement extends React.Component{
    constructor() {
        super();

        this.details =[
            {
                name:"title",
                value:"2018 CHEVROLET EQUINOX"
            },
            {
                name:"YEAR",
                value:"2018"
            },
            {
                name:"MAKE",
                value:"test make"
            },
            {
                name:"MODEL",
                value:"test make"
            },
            {
                name:"SERIES",
                value:"test model"
            },
            {
                name:"STYLE",
                value:"test series"
            },
            {
                name:"DRIVE",
                value:"test style"
            },
            {
                name:"ENGINE",
                value:"test engine"
            },
            {
                name:"FUEL",
                value:"test fuel"
            },
            {
                name:"CYLINDERS",
                value:"test cylinders"
            },
            {
                name:"TRANS.",
                value:"test trans"
            },
            {
                name:"DRIVETRAIN",
                value:"test drivetrain"
            },
            {
                name:"MILEAGE:",
                value:"test mileage"
            },
            {
                name:"EXT. COLOR",
                value:"test ext color"
            },
            {
                name:"INT.COLOR",
                value:"test int color"
            },
            {
                name:"TYPE",
                value:"test type"
            },
            {
                name:"STATUS",
                value:"test status"
            },
            {
                name:"VIN",
                value:"test vin"
            }
        ]
    }
    render() {
        return (
           <Card style={{width:"100%"}}>
               <CardContent>
                   <Grid container spacing={2}>
                       <Grid item xs={8}>
                            <CarImagesGallery />
                       </Grid>
                       <Grid item xs={4}>
                           <CarDescription details={this.details}/>
                       </Grid>
                       <Grid item xs={12}>
                           <CarCalculation />
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