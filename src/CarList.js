import React from "react";
import Car from './Car';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class CarList extends React.Component {
    constructor(props) {
        super(props);

        let noCars = this.props.detailsList.length  == 0;

        this.state = {
            firstCarIndex:0,
            previousBtnDisabled:true,
            nextBtnDisabled:noCars
        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carOnClick = this.carOnClick.bind(this);
    }

    updateBtnDisabled(firstCarIndex){
        return {
            previousBtnDisabled:firstCarIndex == 0,
            nextBtnDisabled:(firstCarIndex == this.props.detailsList.length - 1)
        };
    }

    previous(){
        if(this.state.firstCarIndex > 0) {
            let newCarIndex = (this.state.firstCarIndex - 1);

            this.setState({firstCarIndex: newCarIndex, ...this.updateBtnDisabled(newCarIndex)});
        }
    }

    next(){
        if(this.state.firstCarIndex < this.props.detailsList.length - 1){
            let newCarIndex = (this.state.firstCarIndex + 1);

            this.setState({firstCarIndex:newCarIndex, ...this.updateBtnDisabled(newCarIndex)});
        }
    }

    carOnClick(carIndex){
        this.setState({firstCarIndex:carIndex}, () => {
            if (this.props.onChange)
                this.props.onChange(this.props.detailsList[carIndex])
        });
    }

    render(){
        return (
            <Grid container>
                <Grid item xs={1}>
                    <Button disabled={this.state.previousBtnDisabled} variant="contained" onClick={this.previous}>Prev</Button>
                </Grid>
                {
                    this.props.detailsList.slice(this.state.firstCarIndex, this.state.firstCarIndex + 5).map((details, index) =>
                        <Grid item xs={2} style={{padding:10}}>
                            <Car details={details} onClick={(event, carDetails) => this.carOnClick(this.state.firstCarIndex + index)}/>
                        </Grid>
                    )
                }
                <Grid item xs={1}>
                    <Button disabled={this.state.nextBtnDisabled} variant="contained" onClick={this.next}>Next</Button>
                </Grid>
            </Grid>
        )
    }
}