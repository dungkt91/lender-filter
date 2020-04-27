import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CarDescription from "./CarDescription";
import CarCalculation from "./CarCalculation";
import CarImagesGallery from "./CarImagesGallery";
import CarShowElementButtons from "./CarShowElementButtons";
import Grid from "@material-ui/core/Grid";

export default class CarShowElement extends React.Component{
    render() {
        return (
           <Card style={{width:"100%"}}>
               <CardContent>
                   <Grid container spacing={2}>
                       <Grid item xs={12} lg={7}>
                            <CarImagesGallery images={this.props.images}/>
                       </Grid>
                       <Grid item xs={12} lg={5}>
                           <CarDescription details={this.props.details}/>
                       </Grid>
                       <Grid item xs={12}>
                           <CarCalculation filtersInputs={this.props.filtersInputs} lenderData={this.props.lenderData}/>
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