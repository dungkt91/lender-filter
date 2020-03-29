import * as React from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";

const PLEASE_SELECT_INDEX = 0;

export default class LenderFilter extends React.Component{
    constructor() {
        super();
        this.createTestData();
        this.selectLenderEvent = this.selectLenderEvent.bind(this);
        this.selectTierEvent = this.selectTierEvent.bind(this);
    }

    textfieldsBeginningState(){
        return {
            selectedTierIndex:0,
            currencyFields:{
                "Payment":"",
                "Down Payment":"",
                "Trade Allowance":"",
                "Trade Payoff":"",
                "Trace a.c.v":""
            },
            percentageFields:{
                "Tax":""
            }
        }
    }

    filterBeginningState(){
        let beginningState = {
            selectedLenderValue: 0,
            selectedLenderImage: null,
            tierMenuItems:[],
            ...this.textfieldsBeginningState(),
            isTierSelectEnabled:false,
            isTextFieldsEnabled:false,
        };

        beginningState.tierMenuItems.push(<MenuItem key={"tier_please_select_item"}value={PLEASE_SELECT_INDEX}>Please select tier</MenuItem>);

        return beginningState;
    }

    createTestData(){
        this.state = this.filterBeginningState();

        this.lenders = [
            {
                "name":"Axis Auto Leasing",
                "img":"https://mma.prnewswire.com/media/969479/Axis_Auto_Finance_Inc__Axis_Auto_Finance_Enters_Into_a_Strategic.jpg",
                "tiers":["TIER 1","TIER 2","TIER 3", "TIER4"]
            },
            {
                "name":"iA Auto Finance",
                "img":"https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://loanscanada.ca/wp-content/uploads/2020/03/iA-Auto-Finance.png",
                "tiers":["1ST GEAR","2ND GEAR","3RD GEAR","4TH GEAR","5TH GEAR","6TH GEAR"]
            },
            {
                "name":"CARFINCO",
                "img":"https://images.squarespace-cdn.com/content/59b814e6cd0f68f94fd5bed9/1511197285297-ER8U6EX93C27S751M4VX/carfinco-logo.png",
                "tiers":["TIER 1", "TIER 2", "TIER 3", "TIER 4", "TIER 5", "TIER 6", "TIER 7", "TIER 8"]
            }
        ];

        this.lenderMenuItems = [];
        this.lenderMenuItems.push(<MenuItem key="please_select_item" value={PLEASE_SELECT_INDEX}>Please select lender</MenuItem>)

        for(let i = 0; i < this.lenders.length; i++){
            let lender = this.lenders[i];

            this.lenderMenuItems.push(<MenuItem key={"lender_name_" + i} value={i+1}>{lender.name}</MenuItem>);
        }
    }

    textboxOnChange(event, fieldLabel){
        let newValue = event.target.value;
        console.log(fieldLabel);
        console.log(this.state);

        if (fieldLabel in this.state.currencyFields){
            this.state.currencyFields[fieldLabel] = newValue;
            let newCurrencyFields = {...this.state.currencyFields};
            newCurrencyFields[fieldLabel] = newValue;

            this.setState({currencyFields:newCurrencyFields});
        }else if (fieldLabel in this.state.percentageFields){
            this.state.percentageFields[fieldLabel] = newValue;
            let newPercentageFields = {...this.state.percentageFields};
            newPercentageFields[fieldLabel] = newValue;

            this.setState({percentageFields:newPercentageFields})
        }
    }

    selectLenderEvent(event){
        let index = event.target.value;
        let indexMinusOne = index - 1;

        let newState = {};
        newState.selectedLenderValue = index;

        let isPleaseSelectItemSelected = index == PLEASE_SELECT_INDEX;

        // Update lender logo
        if (isPleaseSelectItemSelected){
            newState.selectedLenderImage = null;
            newState.isTierSelectEnabled = false;
        }else{
            newState.selectedLenderImage = this.lenders[indexMinusOne].img;
            newState.isTierSelectEnabled = true;
        }

        // Update tiers
        if (!isPleaseSelectItemSelected){
            let newTierMenuItems = [];
            let lenderTiers = this.lenders[indexMinusOne].tiers;

            newTierMenuItems.push(<MenuItem value={PLEASE_SELECT_INDEX}>Please select tier</MenuItem>);

            for (let i = 0; i < lenderTiers.length; i++) {
                let itemValue = i + 1;

                newTierMenuItems.push(<MenuItem value={itemValue}>{lenderTiers[i]}</MenuItem>)
            }

            newState.tierMenuItems = newTierMenuItems;
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
                        {this.lenderMenuItems}
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
                                                         value={this.state.currencyFields[currencyFieldLabel]}
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
                                                             value={this.state.percentageFields[percentageFieldLabel]}
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