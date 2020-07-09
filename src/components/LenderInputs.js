import React from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

class LenderInputs extends React.Component {
    constructor(props) {
        super(props);

        this.removeLenderInput = this.removeLenderInput.bind(this);
    }

    fieldNameToTitle(fieldName){
        return {
            "selectedLender":"Lender",
            "selectedTier":"Tier",
            "payment":"Payment",
            "downPayment":"Down Payment",
            "tradeAllowance":"Trade Allowance",
            "tradePayOff":"Trade Payoff",
            "tradeAcv":"Trade a.c.v",
            "tax":"Tax"
        }[fieldName];
    }
    
    removeLenderInput(index){
        this.props.removeLenderInput(index);
    }

    render(){
        console.log("render");

        return (
            <>
                <Grid container>
                {this.props.lenderInputs.map((lenderInput, lenderInputIndex) => {
                    return (
                    <Grid item xs={12} className={"lender_input_values"}>
                        <Grid container>
                            <Grid item xs={12} className={"lender_input_delete_btn_wrapper"}>
                                <IconButton className={"lender_input_delete_btn"} onClick={(event) => this.removeLenderInput(lenderInputIndex)}><CloseIcon /></IconButton>
                            </Grid>
                        {
                            Object.keys(lenderInput).map(lenderInputFieldName => {
                              return (
                                  <>
                                     <Grid item xs={6} className={"lender_input_value_header"}>
                                         {this.fieldNameToTitle(lenderInputFieldName)}
                                     </Grid>
                                      <Grid item xs={6} className={"lender_input_value"}>
                                          {lenderInput[lenderInputFieldName]}
                                      </Grid>
                                  </>
                              )
                            })
                        }
                        </Grid>
                    </Grid>
                    )
                })}
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lenderInputs: state["lenderInputs"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeLenderInput: (index) => {
            dispatch({
                type:"REMOVE_LENDER_INPUT",
                index:index
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderInputs);