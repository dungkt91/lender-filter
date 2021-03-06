import React from 'react';
import {connect} from "react-redux";
import Car from "./Car";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import "./CarList.css";

class CarList extends React.Component {
    constructor(props) {
        super(props);

        let selectedCarIndex = 0;

        if(this.props.initSelectedCarIndex){
            selectedCarIndex = this.props.initSelectedCarIndex;
        }

        this.state = {
            selectedCarIndex:selectedCarIndex,
            firstBtnDisabled:this.props.initSelectedCarIndex == 0,
            previousBtnDisabled:this.props.initSelectedCarIndex == 0,
            nextBtnDisabled:this.props.initSelectedCarIndex == this.props.carDetails.length - 1,
            lastBtnDisabled:this.props.initSelectedCarIndex == this.props.carDetails.length - 1
        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carOnClick = this.carOnClick.bind(this);
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
    }

    updateBtnDisabled(selectedCarIndex){
        return {
            firstBtnDisabled: selectedCarIndex == 0,
            previousBtnDisabled:selectedCarIndex == 0,
            nextBtnDisabled:(selectedCarIndex == this.props.carDetails.length - 1),
            lastBtnDisabled: (selectedCarIndex == this.props.carDetails.length - 1)
        };
    }

    callOnChange = (carIndex) => {
        if (this.props.onChange)
            this.props.onChange(carIndex);
    }

    first(){
        if (this.state.selectedCarIndex > 0){
            let newCarIndex = 0;

            this.setState({selectedCarIndex: newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    previous(){
        if(this.state.selectedCarIndex > 0) {
            let newCarIndex = (this.state.selectedCarIndex - 1);

            this.setState({selectedCarIndex: newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    next(){
        if(this.state.selectedCarIndex < this.props.carDetails.length - 1){
            let newCarIndex = (this.state.selectedCarIndex + 1);

            this.setState({selectedCarIndex:newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    last(){
        if (this.state.selectedCarIndex < this.props.carDetails.length - 1){
            let newCarIndex = this.props.carDetails.length - 1;

            this.setState({selectedCarIndex: newCarIndex, ...this.updateBtnDisabled(newCarIndex)}, this.callOnChange(newCarIndex));
        }
    }

    carOnClick(carIndex){
        this.setState({selectedCarIndex:carIndex}, this.callOnChange(carIndex));
    }

    renderFullVersion(startCarIndex, endCarIndex){
        return (
            <>
                <Grid container>
                    {
                        this.props.carDetails.slice(startCarIndex, endCarIndex + 1).map((carDetail, index) =>
                            <Grid item xs={1} style={{padding:10}}>
                                <div className={(startCarIndex + index == this.state.selectedCarIndex)?"selected_car":""}>
                                    <Car size={"sm"} details={carDetail} onClick={(event, carDetails) => this.carOnClick(startCarIndex + index)}/>
                                </div>
                            </Grid>
                        )
                    }
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <div style={{display:'flex', width:'100%', height:'100%', alignItems: 'center', justifyContent:"center"}}>
                            <IconButton disabled={this.state.previousBtnDisabled} variant="contained" onClick={this.previous} size={"medium"} className={"full_version navigation_btn prev_btn " + (this.state.previousBtnDisabled?"disabled":"enabled")}><ArrowLeft /> Prev</IconButton>
                            <IconButton disabled={this.state.nextBtnDisabled} variant="contained" onClick={this.next} size={"medium"} className={"full_version navigation_btn next_btn " + (this.state.nextBtnDisabled?"disabled":"enabled")}>Next <ArrowRight /></IconButton>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }

    renderOnlyButtonsVersion(){
        return (
            <Grid container>
                <Grid item xs={5}>
                    <Grid container>
                        <Grid item xs={6}>
                            <IconButton disabled={this.state.firstBtnDisabled} onClick={this.first} className={"navigation_btn firt_btn " + (this.state.firstBtnDisabled?"disabled":"enabled")}><FirstPageIcon />First</IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton disabled={this.state.previousBtnDisabled} variant="contained" onClick={this.previous} size={"medium"} className={"navigation_btn prev_btn " + (this.state.previousBtnDisabled?"disabled":"enabled")}><ArrowLeft /> Prev</IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={5}>
                    <Grid container>
                        <Grid item xs={6} style={{textAlign:"right"}}>
                            <IconButton disabled={this.state.nextBtnDisabled} variant="contained" onClick={this.next} size={"medium"} className={"navigation_btn next_btn " + (this.state.nextBtnDisabled?"disabled":"enabled")}>Next <ArrowRight /></IconButton>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:"right"}}>
                            <IconButton disabled={this.state.lastBtnDisabled} onClick={this.last} className={"navigation_btn last_btn " + (this.state.lastBtnDisabled?"disabled":"enabled")}>Last<LastPageIcon /></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    render(){
        let startCarIndex = -1;
        let endCarIndex = -1;

        if (this.state.selectedCarIndex - 4 >= 0 && this.state.selectedCarIndex + 4 < this.props.carDetails.length){
            startCarIndex = this.state.selectedCarIndex - 4;
            endCarIndex = this.state.selectedCarIndex + 4;
        }else if(this.state.selectedCarIndex - 4 < 0){
            startCarIndex = 0;
            endCarIndex = 8;
        }else if(this.state.selectedCarIndex + 4 >= this.props.carDetails.length){
            endCarIndex = this.props.carDetails.length;
            startCarIndex = this.props.carDetails.length - 9;
        }

        let fullVersion = true;

        if(!this.props.screenData["mdUp"]){
            fullVersion = false;
        }

        if (fullVersion){
            return this.renderFullVersion(startCarIndex, endCarIndex);
        }else {
            return this.renderOnlyButtonsVersion();
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        carDetails:state["postProcessingCarDetails"],
        screenData:state["screenData"],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarList);