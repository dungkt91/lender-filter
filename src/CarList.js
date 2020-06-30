import React from "react";
import Car from './Car';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './CarList.css';

export default class CarList extends React.Component {
    constructor(props) {
        super(props);

        let noCars = this.props.detailsList.length  == 0;

        this.state = {
            selectedCarIndex:0,
            previousBtnDisabled:true,
            nextBtnDisabled:noCars
        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carOnClick = this.carOnClick.bind(this);
    }

    updateBtnDisabled(selectedCarIndex){
        return {
            previousBtnDisabled:selectedCarIndex == 0,
            nextBtnDisabled:(selectedCarIndex == this.props.detailsList.length - 1)
        };
    }

    callOnChange = (carIndex) => {
        if (this.props.onChange)
            this.props.onChange(this.props.detailsList[carIndex]);
    }

    previous(){
        if(this.state.selectedCarIndex > 0) {
            let newCarIndex = (this.state.selectedCarIndex - 1);

            this.setState({selectedCarIndex: newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    next(){
        if(this.state.selectedCarIndex < this.props.detailsList.length - 1){
            let newCarIndex = (this.state.selectedCarIndex + 1);

            this.setState({selectedCarIndex:newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    carOnClick(carIndex){
        this.setState({selectedCarIndex:carIndex}, this.callOnChange(carIndex));
    }

    render(){
        let startCarIndex = -1;
        let endCarIndex = -1;

        if (this.state.selectedCarIndex - 5 >= 0 && this.state.selectedCarIndex + 5 < this.props.detailsList.length){
            startCarIndex = this.state.selectedCarIndex - 5;
            endCarIndex = this.state.selectedCarIndex + 5;
        }else if(this.state.selectedCarIndex - 5 < 0){
            startCarIndex = 0;
            endCarIndex = 10;
        }else if(this.state.selectedCarIndex + 5 >= this.props.detailsList.length){
            endCarIndex = this.props.detailsList.length;
            startCarIndex = this.props.detailsList.length - 11;
        }

        return (
            <Grid container style={{minHeight: 200}}>
                {
                    this.props.detailsList.slice(startCarIndex, endCarIndex + 1).map((details, index) =>
                        <Grid item xs={1} style={{padding:10}}>
                            <div className={(startCarIndex + index == this.state.selectedCarIndex)?"selected_car":""}>
                                <Car size={"sm"} details={details} onClick={(event, carDetails) => this.carOnClick(startCarIndex + index)}/>
                            </div>
                        </Grid>
                    )
                }
                <Grid item xs={1}>
                    <div style={{display:'flex', width:'100%', height:'100%', alignItems: 'center', justifyContent:"space-around"}}>
                        <IconButton disabled={this.state.previousBtnDisabled} variant="contained" onClick={this.previous}><ArrowBackIos /></IconButton>
                        <IconButton disabled={this.state.nextBtnDisabled} variant="contained" onClick={this.next}><ArrowForwardIosIcon /></IconButton>
                    </div>
                </Grid>
            </Grid>
        )
    }
}