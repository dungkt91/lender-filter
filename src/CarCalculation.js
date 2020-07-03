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
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {getLenderData, getLenderInputs, setLenderInputs} from "./GlobalVariables";
import LenderInput from "./LenderInput";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import "./CarCalculation.css";

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

function mileageToKms(mileage){
    return mileage * 1.60934;
}



function addCurrencySymbol(value){
    if (value < 0){
        return `-$${Math.abs(value)}`
    }else{
        return `$${value}`
    }
}

function pv(rate, periods, payment, future, type) {
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

function getLenderId(lenderName, lenders){
    for(let i = 0; i < lenders.length; i++){
        if (lenderName == lenders[i].name)
            return lenders[i].id;
    }

    return null;
}

export function calculateProfitFirstInterest(filterInputs, lenderData, carDetails){
    let calculationDetails = createCalculationDetail(-1, filterInputs, lenderData, carDetails);
    let interestColumnIndex = 3;
    let profitColumnIndex = 8;
    let interests = calculationDetails[interestColumnIndex].split(',');

    if (interests.length > 0) {
        // Select first interest as default
        let firstInterest = interests[0];

        let calculationDetailsForFirstInterest = createCalculationDetail(firstInterest, filterInputs, lenderData, carDetails);
        let profit = calculationDetailsForFirstInterest[profitColumnIndex];

        if (profit != 'NOT_FOUND')
            return profit;
    }

    return null;
}

function createCalculationDetail(selectedInterest, filterInputs, lenderData, carDetails){
    console.log('createCalculationDetail()');
    console.log(selectedInterest);
    console.log(filterInputs);
    console.log(lenderData);
    console.log(carDetails);

    let lenders = lenderData[0];
    let lenderPrograms = lenderData[1];
    let lenderTerms = lenderData[2];

    let lenderName = filterInputs["lender"];
    let tierName = filterInputs["tier"];
    console.log('lenderName = ' + lenderName);
    console.log('tierName = ' + tierName);

    // Advance
    let advance = 'NOT_FOUND';
    let interest = 'NOT_FOUND';
    let term = 'NOT_FOUND';
    let foundLenderTerm = null;
    let foundLenderProgram = null;
    let lenderId = getLenderId(lenderName, lenders);
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

        let carKms = mileageToKms(parseFloat(carDetails.mileage));
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

    let payment = parseFloat(filterInputs["payment"]);
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

    if (selectedInterest != -1 && term!='NOT_FOUND') {
        let discount = 0;
        let tax = 0;
        let financed = pv((selectedInterest / 100 + discount + tax) / 12, term, -payment, 0);
        let holdBack = foundLenderProgram.hold_back;
        let funded = financed * (1 - holdBack);

        console.log('financed = ' + financed);
        console.log('holdBack = ' + holdBack);
        console.log('funded = ' + funded);

        let lender = 0;
        let ppsa = 0;

        let tradeAllowance = 0;
        if (filterInputs["trade allowance"] != '' && !isNaN(filterInputs["trade allowance"])) {
            tradeAllowance = parseFloat(filterInputs["trade allowance"]);
        }

        let tradePayOff = 0;
        if (filterInputs["trade payoff"] != '' && !isNaN(filterInputs["trade payoff"])) {
            tradePayOff = parseFloat(filterInputs["trade payoff"])
        }

        let downPayment = 0;
        if (filterInputs["down payment"] != '' && !isNaN(filterInputs["down payment"])) {
            downPayment = parseFloat(filterInputs["down payment"]);
        }

        let tradeAcv = 0;
        if (filterInputs["trade a.c.v"] != '' && !isNaN(filterInputs["trade a.c.v"])) {
            tradeAcv = parseFloat(filterInputs["trade a.c.v"])
        }

        console.log('tradeAllowance = ' + tradeAllowance);
        console.log('tradePayOff = ' + tradePayOff);
        console.log('downPayment = ' + downPayment);
        console.log('tradeAcv = ' + tradeAcv);

        let paidOut = funded - lender - ppsa + tradeAllowance - tradePayOff + downPayment;
        console.log('paidOut = ' + paidOut);

        let userInputTax = 0;

        if (filterInputs["tax"] != '' && !isNaN(filterInputs["tax"])) {
            console.log(filterInputs["tax"]);
            userInputTax = parseFloat(filterInputs["tax"]) / 100;
        }

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
        maxFront = addCurrencySymbol(maxFront);
    }

    if (maxProfit != 'NOT_FOUND'){
        maxProfit = addCurrencySymbol(maxProfit);
    }

    console.log('End createCalculationDetail()');
    return [lenderName, tierName, (advance * 100) + '%', interest, term, '$' + payment, back, maxFront, maxProfit];
}

class CarCalculationClass extends React.Component{
    constructor(props) {
        super(props);

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
            interests:[-1,-1,-1],
            lendersDialogOpen:false,
            lenderToPrograms: this.createLenderToPrograms(),
            lenderInputs: this.props.filtersInputs
        }

        this.selectInterestEvent = this.selectInterestEvent.bind(this);
        this.addRemoveLenders = this.addRemoveLenders.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.addLender = this.addLender.bind(this);
    }

    createLenderToPrograms(){
        let lenderData = getLenderData();

        if(lenderData){
            let lenderToPrograms = {};
            let lenderIdToLenderName = {};
            let [lenders, lenderPrograms, ...rest] = lenderData;

            lenders.forEach(lender => {
                lenderIdToLenderName[lender["id"]] = lender["name"];
            });

            lenderPrograms.forEach(lenderProgram => {
                let lenderName = lenderIdToLenderName[lenderProgram["lender_id"]];

                if (!(lenderName in lenderToPrograms)) {
                    lenderToPrograms[lenderName] = [];
                }

                lenderToPrograms[lenderName].push(lenderProgram["name"]);
            });

            return lenderToPrograms;
        }

        return [];
    }

    createCalculationDetails(selectedInterests, filtersInputs, lenderData, details){
        let newCalculationDetailsValues = [];

        for(let [i, filterInputs] of filtersInputs.entries()){
            if(this.isValidFilterInputs(filterInputs)) {
                if (selectedInterests[i] == -1){
                    let calculationDetails = createCalculationDetail(-1, filterInputs, lenderData, details);
                    let interestColumnIndex = 3;
                    let interests = calculationDetails[interestColumnIndex].split(',');

                    if (interests.length > 0) {
                        // Select first interest as default
                        let firstInterest = interests[0];
                        this.state.interests[i] = firstInterest;

                        newCalculationDetailsValues.push(createCalculationDetail(firstInterest, filterInputs, lenderData, details));
                    }else{
                        newCalculationDetailsValues.push(calculationDetails);
                    }
                }
                else{
                    newCalculationDetailsValues.push(createCalculationDetail(selectedInterests[i], filterInputs, lenderData, details));
                }
            }
        }

        return newCalculationDetailsValues;
    }

    isValidFilterInputs(filterInputs){
        return filterInputs.selectedLenderIndex != 0 && filterInputs.selectedTierIndex != 0;
    }

    selectInterestEvent(event, lenderIndex){
        let newInterest = event.target.value;
        let interests = this.state.interests;
        interests[lenderIndex] = newInterest;

        this.setState({interests:interests});
    }

    removeLenderInput(lenderInputIndex){
        let newLenderInputs = [...this.state.lenderInputs];
        newLenderInputs.splice(lenderInputIndex, 1);
        setLenderInputs(newLenderInputs);

        this.setState({lenderInputs:newLenderInputs});
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
                                    <StyledTableCell>
                                        Actions
                                    </StyledTableCell>
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
                                    <StyledTableCell>
                                        <IconButton className="remove_lender" onClick={(event) => this.removeLenderInput(lenderIndex)}><DeleteIcon /></IconButton>
                                    </StyledTableCell>
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

    addRemoveLenders(){
        this.setState({lendersDialogOpen: true});
    }

    handleModalClose(){
        this.setState({lendersDialogOpen:false});
    }

    addLender(lenderInput){
        let newLenderInputs = getLenderInputs();

        if (newLenderInputs == null)
            newLenderInputs = [];
        newLenderInputs.push(lenderInput);
        setLenderInputs(newLenderInputs);
        this.setState({lendersDialogOpen:false, lenderInputs:newLenderInputs});
    }

    render(){
        let userInputsFilterData = this.state.lenderInputs != undefined;
        let calculationDetailsValues = this.createCalculationDetails(this.state.interests, this.state.lenderInputs, this.props.lenderData, this.props.details);

        if (userInputsFilterData){
            let table = null;

            if (this.props.isBigScreen){
                table = this.renderWithOneTable(calculationDetailsValues);
            }else{
                table = this.renderWithThreeTables(calculationDetailsValues);
            }

            return (
                <>
                    {table}
                    <div style={{textAlign:'right', marginTop:10}}>
                        <Button variant={"contained"} color={"primary"} onClick={this.addRemoveLenders}><AddIcon />Add Lender</Button>
                    </div>
                    <Dialog  open={this.state.lendersDialogOpen}
                             onClose={this.handleModalClose}>
                        <DialogTitle>Add Lender</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please enter full information for new lender</DialogContentText>
                            <LenderInput lenderToPrograms={this.state.lenderToPrograms} onChange={this.addLender}/>
                        </DialogContent>
                    </Dialog>
                </>
            )
        }else{
            return null;
        }
    }
}

export default CarCalculation;