import * as React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const CarCalculation = (props)=>{
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <CarCalculationClass isBigScreen={mdUp} {...props}/>
}

class CarCalculationClass extends React.Component{
    constructor() {
        super();

        this.calculationDetailsColumnHeaders =[
            "Lender",
            "Tier",
            "Advance",
            "Interest",
            "Term",
            "Payment",
            "Back",
            "Front",
            "Profit"
        ];

        this.state = {
            calculationDetailsValues:[],
            interests:[-1,-1,-1]
        }

        this.selectInterestEvent = this.selectInterestEvent.bind(this);
    }

    createCalculationDetails(selectedInterests, filtersInputs, lenderData, details){
        let newCalculationDetailsValues = [];

        for(let [i, filterInputs] of filtersInputs.entries()){
            if(this.isValidFilterInputs(filterInputs))
                newCalculationDetailsValues.push(this.createCalculationDetail(selectedInterests[i], filterInputs, lenderData, details));
        }

        return newCalculationDetailsValues;
    }

    isValidFilterInputs(filterInputs){
        return filterInputs.selectedLenderIndex != 0 && filterInputs.selectedTierIndex != 0;
    }

    mileageToKms(mileage){
        return mileage * 1.60934;
    }

    createCalculationDetail(selectedInterest, filterInputs, lenderData, carDetails){
        console.log('createCalculationDetail()');
        console.log(selectedInterest);
        console.log(filterInputs);
        console.log(lenderData);
        console.log(carDetails);

        let lenders = lenderData[0];
        let lenderPrograms = lenderData[1];
        let lenderTerms = lenderData[2];

        let lenderName = filterInputs.allLenderNames[filterInputs.selectedLenderIndex - 1];
        let tierName = filterInputs.allTierNames[filterInputs.selectedTierIndex - 1];
        console.log('lenderName = ' + lenderName);
        console.log('tierName = ' + tierName);

        // Advance
        let advance = 'NOT_FOUND';
        let interest = 'NOT_FOUND';
        let term = 'NOT_FOUND';
        let foundLenderTerm = null;
        let foundLenderProgram = null;
        let lenderId = this.getLenderId(lenderName, lenders);
        console.log('lenderId = ' + lenderId);

        if(lenderId != null){
            for(let lenderProgram of lenderPrograms){
                if (lenderProgram.lender_id == lenderId && lenderProgram.name == tierName){
                    foundLenderProgram = lenderProgram;

                    // Advance
                    if(!isNaN(lenderProgram.advance)){
                        advance = parseFloat(lenderProgram.advance);
                    }

                    // Interest
                    let rateMin = parseFloat(lenderProgram.rate_min);
                    let rateMax = parseFloat(lenderProgram.rate_max);
                    interest = '';

                    for(let rate = rateMin; rate < rateMax; rate+=1){
                        interest += rate + ',';
                    }

                    interest += rateMax;

                    break;
                }
            }

            let carKms = this.mileageToKms(parseFloat(carDetails.mileage));
            console.log('carKms = ' + carKms);

            for(let lenderTerm of lenderTerms){
                if (lenderTerm.lender_id == lenderId && lenderTerm.min_kms <= carKms && lenderTerm.max_kms >= carKms && lenderTerm.year == parseInt(carDetails.year)){
                    // Term
                    term = lenderTerm.term;
                    foundLenderTerm = lenderTerm;
                    break;
                }
            }
        }

        console.log('advance = ' + advance);
        console.log('interest = ' + interest);
        console.log('term = ' + term);

        let payment = parseFloat(filterInputs.currencyFields.Payment.value);
        let back = '0';

        // Calculate max front
        let maxFront = 'NOT_FOUND';

        if (foundLenderTerm !=null && advance != "NOT_FOUND"){
            let termType = foundLenderTerm.type.replace(/\s/g, '');
            console.log('termType = ' + termType);

            switch(termType.toLowerCase()){
                case 'x-clean':
                    maxFront = carDetails.x_clean * advance - carDetails.total_cost;
                    break;
                case 'clean':
                    maxFront = carDetails.clean  * advance - carDetails.total_cost;
                    break;
                case 'average':
                    maxFront = carDetails.average  * advance - carDetails.total_cost;
                    break;
                case 'rough':
                    maxFront = carDetails.rough  * advance - carDetails.total_cost;
                    break;
            }

            maxFront = Math.round(maxFront);
        }

        console.log('maxFront = ' + maxFront);

        // Calculate max profit
        let maxProfit = 'NOT_FOUND';

        if (selectedInterest != -1 && term!='NOT_FOUND'){
            let discount = 0;
            let tax = 0;
            let financed = this.pv((selectedInterest/100 + discount + tax)/12, term, -payment, 0);
            let holdBack = foundLenderProgram.hold_back;
            let funded = financed*(1-holdBack);

            console.log('financed = ' + financed);
            console.log('holdBack = ' + holdBack);
            console.log('funded = ' + funded);

            let lender = 0;
            let ppsa = 0;

            let tradeAllowance = 0;
            if (filterInputs.currencyFields["Trade Allowance"].value != '' && !isNaN(filterInputs.currencyFields["Trade Allowance"].value)){
                tradeAllowance = parseFloat(filterInputs.currencyFields["Trade Allowance"].value);
            }

            let tradePayOff = 0;
            if (filterInputs.currencyFields["Trade Payoff"].value != '' && !isNaN(filterInputs.currencyFields["Trade Payoff"].value)){
                tradePayOff = parseFloat(filterInputs.currencyFields["Trade Payoff"].value)
            }

            let downPayment = 0;
            if (filterInputs.currencyFields["Down Payment"].value != '' && !isNaN(filterInputs.currencyFields["Down Payment"].value)){
                downPayment = parseFloat(filterInputs.currencyFields["Down Payment"].value);
            }

            let tradeAcv = 0;
            if (filterInputs.currencyFields["Trace a.c.v"].value != '' && !isNaN(filterInputs.currencyFields["Trace a.c.v"].value)){
                tradeAcv = parseFloat(filterInputs.currencyFields["Trace a.c.v"].value)
            }

            console.log('tradeAllowance = ' + tradeAllowance);
            console.log('tradePayOff = ' + tradePayOff);
            console.log('downPayment = ' + downPayment);
            console.log('tradeAcv = ' + tradeAcv);

            let paidOut = funded - lender - ppsa + tradeAllowance - tradePayOff + downPayment;
            console.log('paidOut = ' + paidOut);

            let userInputTax = parseFloat(filterInputs.percentageFields.Tax.value)/100;
            console.log('userInputTax = ' + userInputTax);

            let netPaid = paidOut*(1-userInputTax) + tradeAcv;
            console.log('netPaid = ' + netPaid);

            if (netPaid - carDetails.total_cost < maxFront){
                maxProfit = netPaid - carDetails.total_cost;
            }else {
                maxProfit = maxFront;
            }

            maxProfit = Math.round(maxProfit);
        }

        console.log('maxProfit = ' + maxProfit);

        if (maxFront != 'NOT_FOUND'){
            maxFront = '$' + maxFront;
        }

        if (maxProfit != 'NOT_FOUND'){
            maxProfit = '$' + maxProfit;
        }

        console.log('End createCalculationDetail()');
        return [lenderName, tierName, (advance * 100) + '%', interest, term, '$' + payment, back, maxFront, maxProfit];
    }

    pv(rate, periods, payment, future, type) {
        // Initialize type
        var type = (typeof type === 'undefined') ? 0 : type;

        // Evaluate rate and periods (TODO: replace with secure expression evaluator)
        rate = eval(rate);
        periods = eval(periods);

        // Return present value
        if (rate === 0) {
            return - payment * periods - future;
        } else {
            return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 +rate * type) - future) / Math.pow(1 + rate, periods);
        }
    }

    getLenderId(lenderName, lenders){
        for(let i = 0; i < lenders.length; i++){
            if (lenderName == lenders[i].name)
                return lenders[i].id;
        }

        return null;
    }

    selectInterestEvent(event, lenderIndex){
        let newInterest = event.target.value;
        let interests = this.state.interests;
        interests[lenderIndex] = newInterest;

        this.setState({interests:interests});
    }

    renderWithOneTable(calculationDetailsValues){
        return (
            <React.Fragment>
                <Paper style={{backgroundColor:"rgb(247, 248, 248)"}}>
                    <Table>
                        <TableHead>
                                <StyledTableRow>
                                {this.calculationDetailsColumnHeaders.map(header => (
                                    <StyledTableCell>{header}</StyledTableCell>
                                ))}
                                </StyledTableRow>
                        </TableHead>
                        {
                            calculationDetailsValues.map((columnValues, lenderIndex) =>(
                                <StyledTableRow>
                                    {
                                        columnValues.map((columnValue, index) => {
                                            let interestColumnIndex = 3;

                                            if (index == interestColumnIndex){
                                                let interestMenuItems = [];

                                                columnValue.split(',').forEach((interest, index) => {
                                                    interestMenuItems.push(<MenuItem value={interest}>{interest} %</MenuItem>);
                                                });

                                                return (
                                                    <StyledTableCell>
                                                        <Select onChange={(event) => this.selectInterestEvent(event, lenderIndex)} value={this.state.interests[lenderIndex]}>
                                                            {interestMenuItems}
                                                        </Select>
                                                    </StyledTableCell>
                                                )
                                            }
                                            else
                                            return (
                                                <StyledTableCell>
                                                    {columnValue}
                                                </StyledTableCell>
                                            )
                                        })
                                    }
                                </StyledTableRow>
                            ))
                        }
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }

    createCell(value, index, lenderIndex){
        let interestColumnIndex = 3;

        if (index == interestColumnIndex){
            let interestMenuItems = [];

            value.split(',').forEach((interest, index) => {
                interestMenuItems.push(<MenuItem value={interest}>{interest} %</MenuItem>);
            });

            return (
                    <Select onChange={(event) => this.selectInterestEvent(event, lenderIndex)} value={this.state.interests[lenderIndex]}>
                        {interestMenuItems}
                    </Select>
            )
        }
        else
            return <React.Fragment>
                {value}
            </React.Fragment>
    }

    renderWithThreeTables(calculationDetailsValues){
        let tables = [];

        for(let [lenderIndex, lenderCalculationDetailsValues] of calculationDetailsValues.entries()){
            tables.push(
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:"rgb(247, 248, 248)"}}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Value</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            {
                                lenderCalculationDetailsValues.map((row, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell>{this.calculationDetailsColumnHeaders[index]}</StyledTableCell>
                                        <StyledTableCell>{this.createCell(row, index, lenderIndex)}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </Table>
                    </Paper>
                </Grid>
            )
        }

        return (
            <React.Fragment>
                <Grid container spacing={4}>
                    {tables}
                </Grid>
            </React.Fragment>
        )
    }


    render(){
        let userInputsFilterData = this.props.filtersInputs != undefined && this.props.filtersInputs.length > 0;
        let calculationDetailsValues = this.createCalculationDetails(this.state.interests, this.props.filtersInputs, this.props.lenderData, this.props.details);

        if (userInputsFilterData){
            if (this.props.isBigScreen){
                return this.renderWithOneTable(calculationDetailsValues);
            }else{
                return this.renderWithThreeTables(calculationDetailsValues);
            }
        }else{
            return null;
        }
    }
}

export default CarCalculation;