import React from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./LenderInput.css";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";

class LenderInput extends React.Component {
    constructor(props) {
        super(props);

        this.selectLender = this.selectLender.bind(this);
        this.selectTier = this.selectTier.bind(this);
        this.addLender = this.addLender.bind(this);
        this.reset = this.reset.bind(this);
        this.changeTextField = this.changeTextField.bind(this);
    }

    selectLender(event){
        this.props.selectLender(event.target.value);
    }

    selectTier(event){
        this.props.selectTier(event.target.value);
    }

    addLender(){
        this.props.addLender();
        if(this.props.onChange){
            this.props.onChange();
        }
    }

    reset(){
        this.props.reset();
    }

    changeTextField(event, fieldName){
        this.props.changeLenderInputField(fieldName, event.target.value);
    }

    render(){
        let lenders = Object.keys(this.props.lenderToPrograms);
        let programs = [];

        if (this.props.selectedLender !== "") {
            programs = this.props.lenderToPrograms[this.props.selectedLender];
        }

        let moneyFieldNameToValueDict = {
            "payment": {
                "title":"Payment",
                "value":this.props.payment,
                "disabled":this.props.paymentDisabled
            },
            "downPayment":{
                "title":"Down Payment",
                "value":this.props.downPayment,
                "disabled":this.props.downPaymentDisabled
            },
            "tradeAllowance":{
                "title":"Trade Allowance",
                "value":this.props.tradeAllowance,
                "disabled":this.props.tradeAllowanceDisabled
            },
            "tradePayOff":{
                "title":"Trade Payoff",
                "value":this.props.tradePayOff,
                "disabled":this.props.tradePayOffDisabled
            },
            "tradeAcv":{
                "title":"Trace a.c.v",
                "value":this.props.tradeAcv,
                "disabled":this.props.tradeAcvDisabled
            }
        }

        let percentageFieldNameToValueDict = {
            "tax": {
                "title":"Tax",
                "value":this.props.tax,
                "disabled":this.props.taxDisabled
            }
        }

        return (
            <Grid container className={"lender_input"} spacing={2}>
                <Grid item xs={12}>
                    <Select disabled={this.props.lenderSelectDisabled} style={{width:'100%'}} value={this.props.selectedLender} onChange={this.selectLender}>
                        {
                            lenders.map((lender, index) => {
                                return <MenuItem value={lender}>{lender}</MenuItem>
                            })
                        }
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Select disabled={this.props.tierSelectDisabled} style={{width:'100%'}} value={this.props.selectedTier} onChange={this.selectTier}>
                        {
                            programs.map((program, index) => {
                                return <MenuItem value={program}>{program}</MenuItem>
                            })
                        }
                    </Select>
                </Grid>
                {
                    Object.keys(moneyFieldNameToValueDict).map(moneyFieldName => {
                      return <Grid item xs={6}>
                          <TextField disabled={moneyFieldNameToValueDict[moneyFieldName]["disabled"]} size="small" variant="outlined" label={moneyFieldNameToValueDict[moneyFieldName]["title"]} value={moneyFieldNameToValueDict[moneyFieldName]["value"]} onChange={(event) => this.changeTextField(event, moneyFieldName)} InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }
                          } />
                      </Grid>
                    })
                }

                {
                    Object.keys(percentageFieldNameToValueDict).map(percentageFieldName => {
                        return <Grid item xs={6}>
                            <TextField disabled={percentageFieldNameToValueDict[percentageFieldName]["disabled"]} size="small" variant="outlined" label={percentageFieldNameToValueDict[percentageFieldName]["title"]} value={percentageFieldNameToValueDict[percentageFieldName]["value"]} onChange={(event) => this.changeTextField(event, percentageFieldName)} InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }
                            } />
                        </Grid>
                    })
                }
                <Grid item xs={12} className={"lender_input_buttons"}>
                    <Button disabled={this.props.addBtnDisabled} variant="contained" color={"primary"} onClick={this.addLender}>Add</Button>
                    <Button disabled={this.props.resetBtnDisable} variant="contained" color={"secondary"} onClick={this.reset} style={{marginLeft:10}}>Reset</Button>
                </Grid>
            </Grid>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        lenderToPrograms:state["lenderToPrograms"],
        selectedLender:state["selectedLender"],
        selectedTier:state["selectedTier"],
        lenderSelectDisabled:state["lenderSelectDisabled"],
        tierSelectDisabled:state["tierSelectDisabled"],
        addBtnDisabled:state["addBtnDisabled"],
        resetBtnDisable:state["resetBtnDisable"],
        payment:state["payment"],
        downPayment:state["downPayment"],
        tradeAllowance:state["tradeAllowance"],
        tradePayOff:state["tradePayOff"],
        tradeAcv:state["tradeAcv"],
        tax:state["tax"],
        paymentDisabled:state["paymentDisabled"],
        downPaymentDisabled:state["downPaymentDisabled"],
        tradeAllowanceDisabled:state["tradeAllowanceDisabled"],
        tradePayOffDisabled:state["tradePayOffDisabled"],
        tradeAcvDisabled:state["tradeAcvDisabled"],
        taxDisabled: state["taxDisabled"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectLender: (lenderName) => {
            dispatch({
                type:"SELECT_LENDER",
                name:lenderName
            })
        },
        selectTier: (tierName) => {
            dispatch({
                type:"SELECT_TIER",
                name:tierName
            })
        },
        reset: () => {
            dispatch(
                {
                    type:"RESET_LENDER_INPUT"
                }
            )
        },
        changeLenderInputField: (fieldName, fieldValue) => {
            dispatch({
                type:"CHANGE_LENDER_INPUT_FIELD",
                name:fieldName,
                value:fieldValue
            })
        },
        addLender:() => {
            dispatch({
              type:"ADD_LENDER"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderInput);