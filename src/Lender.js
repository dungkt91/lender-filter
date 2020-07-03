import React from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import LenderInputs from "./LenderInputs";
import LenderInput from "./LenderInput";
import './Lender.css';
import {setLenderInputs} from "./GlobalVariables";

class Lender extends React.Component {
    beginningState(){
        return {
            selectedTier:'NONE',
            tierMenuItems:[],
            tierSelectDisabled:true,

            selectedLender:'NONE',
            lenderSelectDisabled:false,

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
                    value: "",
                    error: false
                }
            },
            isTextFieldsEnabled:false
        }
    }

    constructor(props) {
        super(props);

        let lenderMenuItems = [];

        lenderMenuItems.push(<MenuItem value={'NONE'}>Please select lender</MenuItem>);

        for (let lenderName in props.lenderToPrograms){
            lenderMenuItems.push(<MenuItem value={lenderName}>{lenderName}</MenuItem>);
        }

        this.state = {
            lenderMenuItems:lenderMenuItems,
            ...this.beginningState(),
            lenderInputs:[]
        }

        this.selectLender = this.selectLender.bind(this);
        this.selectTier = this.selectTier.bind(this);
        this.addLender = this.addLender.bind(this);
        this.reset = this.reset.bind(this);
        this.deleteLenderInput = this.deleteLenderInput.bind(this);
    }

    componentDidMount() {
        if(this.props.init){
            this.setState({lenderInputs:this.props.init});
        }
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

    selectLender(event){
        let selectLenderName = event.target.value;

        let tierSelectDisabled = true;

        if (selectLenderName != 'NONE'){
            tierSelectDisabled = false;
        }

        let tierMenuItems = [];
        tierMenuItems.push(<MenuItem value={'NONE'}>Please select tier</MenuItem>);

        for(let tierName of this.props.lenderToPrograms[selectLenderName]) {
            tierMenuItems.push(<MenuItem value={tierName}>{tierName}</MenuItem>);
        }

        this.setState({
            selectedLender:selectLenderName,
            selectedTier:'NONE',
            tierSelectDisabled: tierSelectDisabled,
            tierMenuItems:tierMenuItems
        });
    }

    selectTier(event){
        let selectIndex = event.target.value;

        this.setState({
            selectedTier : selectIndex,
            isTextFieldsEnabled:true
        })
    }

    hasAnyErrorsInLenderInput(){
        let hasAnyErrors = false;

        Object.keys(this.state.currencyFields).forEach((key) => {
            if (this.state.currencyFields[key].error){
                hasAnyErrors = true;
            }
        });

        Object.keys(this.state.percentageFields).forEach((key) => {
            if (this.state.percentageFields[key].error){
                hasAnyErrors = true;
            }
        });

        return hasAnyErrors;
    }

    addLender(event){
        let lenderInput = {};
        let hasAnyErrors = this.hasAnyErrorsInLenderInput();

        if (this.state.selectedLender != 'NONE' && this.state.selectedTier != 'NONE' && !hasAnyErrors) {
            lenderInput["lender"] = this.state.selectedLender;
            lenderInput["tier"] = this.state.selectedTier;
            lenderInput["payment"] = this.state.currencyFields["Payment"].value;
            lenderInput["down payment"] = this.state.currencyFields["Down Payment"].value;
            lenderInput["trade allowance"] = this.state.currencyFields["Trade Allowance"].value;
            lenderInput["trade payoff"] = this.state.currencyFields["Trade Payoff"].value;
            lenderInput["trade a.c.v"] = this.state.currencyFields["Trace a.c.v"].value;
            lenderInput["tax"] = this.state.percentageFields["Tax"].value;

            let newLenderInputs = this.state.lenderInputs;
            newLenderInputs.push(lenderInput);

            this.setState({lenderInputs: newLenderInputs}, this.props.onChange);
        }
    }

    reset(event){
        this.setState({...this.beginningState()});
    }

    deleteLenderInput(event, lenderInputIndex){
        let newLenderInputs = this.state.lenderInputs;

        newLenderInputs.splice(lenderInputIndex, 1);

        this.setState({lenderInputs:newLenderInputs}, this.props.onChange);
    }

    getLenderInputs(){
        return this.state.lenderInputs;
    }

    addLender(lenderInput){
        let newLenderInputs = [...this.state.lenderInputs];
        newLenderInputs.push(lenderInput);
        setLenderInputs(newLenderInputs);

        this.setState({lenderInputs:newLenderInputs});
    }

    render(){
        return (
          <Grid container className={"lender_main_content padding10"} spacing={2}>
              <Grid item xs={12}>
                  <LenderInput lenderToPrograms={this.props.lenderToPrograms} onChange={this.addLender}/>
              </Grid>
              {
                  this.state.lenderInputs.map((lenderInput, lenderInputIndex) =>
                      <Grid item xs={12}>
                          <LenderInputs inputs={lenderInput} handleDeleteBtnClick={(event) => this.deleteLenderInput(lenderInputIndex)}/>
                      </Grid>)
              }
          </Grid>
        );
    }
}

export default Lender;