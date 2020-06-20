import React from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

class Lender extends React.Component {
    constructor(props) {
        super(props);

        let lenderMenuItems = [];

        lenderMenuItems.push(<MenuItem value={0}>Please select lender</MenuItem>);
        for (let i = 0; i < this.props.lenders.length; i++){
            let lenderName = this.props.lenders[i];

            lenderMenuItems.push(<MenuItem value={i + 1}>{lenderName}</MenuItem>);
        }

        this.state = {
            // Lender
            lenderSelectDisabled:false,
            lenderMenuItems:lenderMenuItems,
            lenderSelectedIndex:0,

            // Tier
            tierSelectDisabled:true,
            tierMenuItems:[],
            tierSelectedIndex:0,

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

        this.selectLender = this.selectLender.bind(this);
        this.selectTier = this.selectTier.bind(this);
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
        let selectIndex = event.target.value;
        let tierSelectDisabled = true;

        if (selectIndex != 0){
            tierSelectDisabled = false;
        }

        let tierMenuItems = [];
        tierMenuItems.push(<MenuItem value={0}>Please select tier</MenuItem>);

        this.setState({
            lenderSelectedIndex:selectIndex,
            tierSelectDisabled: tierSelectDisabled,
            tierMenuItems:tierMenuItems
        });
    }

    selectTier(event){
        let selectIndex = event.target.value;

        this.setState({
            tierSelectedIndex : selectIndex,
            isTextFieldsEnabled:true
        })
    }

    render(){
        return (
          <Grid container className={"lender_main_content padding10"}>
              <Grid item xs={12}>
                  <Select onChange={this.selectLender} value={this.state.lenderSelectedIndex} disabled={this.state.lenderSelectDisabled} style={{width:'100%'}}>
                      {this.state.lenderMenuItems}
                  </Select>
              </Grid>
              <Grid item xs={12}>
                  <Select onChange={this.selectTier} value={this.state.tierSelectedIndex} disabled={this.state.tierSelectDisabled} style={{width:'100%'}}>
                      {this.state.tierMenuItems}
                  </Select>
              </Grid>
              {Object.keys(this.state.currencyFields).map(currencyFieldLabel => (
                      <Grid item xs={6} sm={3} md={6} style={{padding:10}}><TextField disabled={!this.state.isTextFieldsEnabled}
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
                      <Grid item xs={6} sm={3} md={6} style={{padding:10}}><TextField disabled={!this.state.isTextFieldsEnabled}
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
              <Grid item xs={12} style={{textAlign:"center"}}>
                  <Button variant="contained" color={"primary"}>Add</Button>
                  <Button variant="contained" color={"secondary"} style={{marginLeft:10}}>Reset</Button>
              </Grid>
          </Grid>
        );
    }
}

export default Lender;