import * as React from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import {fetchCars, fetchLenders, fetchLenderPrograms, fetchLenderTerms} from "./Api";

const PLEASE_SELECT_INDEX = 0;

export default class LenderFilter extends React.Component{
    constructor() {
        super();
        this.selectLenderEvent = this.selectLenderEvent.bind(this);
        this.selectTierEvent = this.selectTierEvent.bind(this);
        this.state = this.filterBeginningState();
    }

    textfieldsBeginningState(){
        return {
            selectedTierIndex:0,
            currencyFields:{
                "Payment":{
                    value: "",
                    error: false
                },
                "Down Payment":{
                    value: "",
                    error: false
                },
                "Trade Allowance":{
                    value: "",
                    error: false
                },
                "Trade Payoff":{
                    value: "",
                    error: false
                },
                "Trace a.c.v":{
                    value: "",
                    error: false
                }
            },
            percentageFields:{
                "Tax":{
                    value: null,
                    error: false
                }
            }
        }
    }

    filterBeginningState(){
        let beginningState = {
            selectedLenderIndex: 0,
            selectedLenderImage: null,
            allLenderNames:[],
            tierMenuItems:[],
            ...this.textfieldsBeginningState(),
            isTierSelectEnabled:false,
            isTextFieldsEnabled:false,
            lenderMenuItems:[],
            selectedTierIndex:0,
            allTierNames:[]
        };

        beginningState.tierMenuItems.push(<MenuItem key={"tier_please_select_item"}value={PLEASE_SELECT_INDEX}>Please select tier</MenuItem>);

        return beginningState;
    }

    componentWillReceiveProps(nextProps){
        let lenderMenuItems = [];
        let allLenderNames = [];

        for(let i = 0; i < nextProps.lenders.length; i++){
            let lender = nextProps.lenders[i];

            lenderMenuItems.push(<MenuItem key={"lender_name_" + i} value={i+1}>{lender.name}</MenuItem>);
            allLenderNames.push(lender.name);
        }

        this.setState({lenderMenuItems:lenderMenuItems, allLenderNames:allLenderNames});
    }

    textboxOnChange(event, fieldLabel){
        let newValue = event.target.value;
        let isError = isNaN(newValue);
        console.log(isError);

        if (fieldLabel in this.state.currencyFields){
            let newCurrencyFields = {...this.state.currencyFields};
            newCurrencyFields[fieldLabel] =  {
                value:newValue,
                error:isError
            }

            this.setState({currencyFields:newCurrencyFields});
        }else if (fieldLabel in this.state.percentageFields){
            let newPercentageFields = {...this.state.percentageFields};
            newPercentageFields[fieldLabel] = {
                value:newValue,
                error:isError
            }
            this.setState({percentageFields:newPercentageFields})
        }
    }

    selectLenderEvent(event){
        let index = event.target.value;
        let indexMinusOne = index - 1;

        let newState = {};
        newState.selectedLenderIndex = index;

        let isPleaseSelectItemSelected = index == PLEASE_SELECT_INDEX;

        // // Update lender logo
        // if (isPleaseSelectItemSelected){
        //     newState.selectedLenderImage = null;
        //     newState.isTierSelectEnabled = false;
        // }else{
        //     newState.selectedLenderImage = this.lenders[indexMinusOne].img_url;
        //     newState.isTierSelectEnabled = true;
        // }

        // Update tiers
        if (!isPleaseSelectItemSelected){
            let selectedLenderId = this.props.lenders[indexMinusOne].id;
            let allTierOfSelectedLender = this.props.lenderPrograms.filter(lenderProgram  => lenderProgram.lender_id == selectedLenderId).map(lenderProgram => lenderProgram.name);
            let newTierMenuItems = [];
            newTierMenuItems.push(<MenuItem value={PLEASE_SELECT_INDEX}>Please select tier</MenuItem>);

            for (let i = 0; i < allTierOfSelectedLender.length; i++) {
                let itemValue = i + 1;

                newTierMenuItems.push(<MenuItem value={itemValue}>{allTierOfSelectedLender[i]}</MenuItem>)
            }

            newState.tierMenuItems = newTierMenuItems;
            newState.isTierSelectEnabled = true;
            newState.allTierNames = allTierOfSelectedLender;
        }

        newState.selectedTierIndex = PLEASE_SELECT_INDEX;

        this.setState(newState);
    }

    selectTierEvent(event){
        let newState = {...this.textfieldsBeginningState()};

        newState.selectedTierIndex = event.target.value;

        let isPleaseSelectItemSelected = event.target.value == PLEASE_SELECT_INDEX;

        if(isPleaseSelectItemSelected){
            newState.isTextFieldsEnabled = false;
        }else{
            newState.isTextFieldsEnabled = true;
        }

        this.setState(newState);
    }

    reset(){
        this.setState(this.filterBeginningState());
    }

    render(){
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Select onChange={this.selectLenderEvent} value={this.state.selectedLenderValue} style={{width:'100%'}}>
                        {this.state.lenderMenuItems}
                    </Select>
                </Grid>
                {/*<Grid item xs={12} style={{textAlign:"center"}}>*/}
                {/*    <img src={this.state.selectedLenderImage} {...this.state.selectedLenderImage == null? {style:{width:'150px', height:'150px', visibility:"hidden"}}:{style:{width:'150px', height:'150px'}}} />*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <Select style={{width:'100%'}} disabled={!this.state.isTierSelectEnabled} value={this.state.selectedTierIndex} onChange={this.selectTierEvent}>
                        {this.state.tierMenuItems}
                    </Select>
                </Grid>
                {Object.keys(this.state.currencyFields).map(currencyFieldLabel => (
                    <Grid item xs={6} sm={3} md={6}><TextField disabled={!this.state.isTextFieldsEnabled}
                                                         label={currencyFieldLabel}
                                                         variant="outlined"
                                                         onChange={(event) => this.textboxOnChange(event, currencyFieldLabel)}
                                                               error = {this.state.currencyFields[currencyFieldLabel].error}
                                                               helperText={this.state.currencyFields[currencyFieldLabel].error?"Invalid Value":""}
                                                               value={this.state.currencyFields[currencyFieldLabel].value}
                                                         InputProps={{
                                                             startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                         }
                                                         }
                                                         size={"small"}
                    /></Grid>
                        )
                    )
                }
                {Object.keys(this.state.percentageFields).map(percentageFieldLabel => (
                        <Grid item xs={6} sm={3} md={6}><TextField disabled={!this.state.isTextFieldsEnabled}
                                                             label={percentageFieldLabel}
                                                             variant="outlined"
                                                             onChange={(event) => this.textboxOnChange(event, percentageFieldLabel)}
                                                             error = {this.state.percentageFields[percentageFieldLabel].error}
                                                                   helperText={this.state.percentageFields[percentageFieldLabel].error?"Invalid Value":""}
                                                             value={this.state.percentageFields[percentageFieldLabel].value}
                                                             InputProps={{
                                                                 startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                                             }}
                                                             size={"small"}
                        /></Grid>
                    )
                )
                }
            </Grid>
        )
    }
}