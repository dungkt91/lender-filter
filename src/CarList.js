import React from "react";
import Car from './Car';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import './CarList.css';

export default class CarList extends React.Component {
    constructor(props) {
        super(props);

        let noCars = this.props.detailsList.length  == 0;

        let selectedCarIndex = 0;

        if(this.props.initSelectedCarIndex){
            selectedCarIndex = this.props.initSelectedCarIndex;
        }

        this.state = {
            selectedCarIndex:selectedCarIndex,
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

        if (this.state.selectedCarIndex - 4 >= 0 && this.state.selectedCarIndex + 4 < this.props.detailsList.length){
            startCarIndex = this.state.selectedCarIndex - 4;
            endCarIndex = this.state.selectedCarIndex + 4;
        }else if(this.state.selectedCarIndex - 4 < 0){
            startCarIndex = 0;
            endCarIndex = 8;
        }else if(this.state.selectedCarIndex + 4 >= this.props.detailsList.length){
            endCarIndex = this.props.detailsList.length;
            startCarIndex = this.props.detailsList.length - 9;
        }

        return (
            <Grid container>
                {
                    this.props.detailsList.slice(startCarIndex, endCarIndex + 1).map((details, index) =>
                        <Grid item xs={1} style={{padding:10}}>
                            <div className={(startCarIndex + index == this.state.selectedCarIndex)?"selected_car":""}>
                                <Car size={"sm"} details={details} onClick={(event, carDetails) => this.carOnClick(startCarIndex + index)}/>
                            </div>
                        </Grid>
                    )
                }
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <div style={{display:'flex', width:'100%', height:'100%', alignItems: 'center', justifyContent:"center"}}>
                        <IconButton disabled={this.state.previousBtnDisabled} variant="contained" onClick={this.previous} size={"medium"} className={"navigation_btn prev_btn " + (this.state.previousBtnDisabled?"disabled":"enabled")}><ArrowLeft /> Prev</IconButton>
                        <IconButton disabled={this.state.nextBtnDisabled} variant="contained" onClick={this.next} size={"medium"} className={"navigation_btn next_btn " + (this.state.nextBtnDisabled?"disabled":"enabled")}>Next <ArrowRight /></IconButton>
                    </div>
                </Grid>
            </Grid>
        )
    }
}