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
        ]

        this.state = {
            calculationDetailsValues:[]
        }
    }

    componentWillReceiveProps(nextProps){
        let newCalculationDetailsValues = [];

        for(let i = 0; i < nextProps.filtersInputs.length; i++){
            let filterInputs = nextProps.filtersInputs[i];

            if(this.isValidFilterInputs(filterInputs))
                newCalculationDetailsValues.push(this.createCalculationDetail(filterInputs, nextProps.lenderData));
        }

        this.setState({calculationDetailsValues:newCalculationDetailsValues});
    }

    isValidFilterInputs(filterInputs){
        return filterInputs.selectedLenderIndex != 0 && filterInputs.selectedTierIndex != 0;
    }

    createCalculationDetail(filterInputs, lenderData){
        let lenders = lenderData[0];
        let lenderPrograms = lenderData[1];
        let lenderTerms = lenderData[2];

        let lenderName = filterInputs.allLenderNames[filterInputs.selectedLenderIndex - 1];
        let tierName = filterInputs.allTierNames[filterInputs.selectedTierIndex - 1];

        // Advance
        let advance = 'NOT_FOUND';
        let interest = 'NOT_FOUND';

        let lenderId = this.getLenderId(lenderName, lenders);

        if(lenderId != null){
            for(let i = 0; i < lenderPrograms.length; i++){
                let lenderProgram = lenderPrograms[i];

                if (lenderProgram.lender_id == lenderId && lenderProgram.name == tierName){
                    if(!isNaN(lenderProgram.advance)){
                        advance = (parseFloat(lenderProgram.advance) * 100) + '%';
                    }

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
        }

        return [lenderName, tierName, advance, interest];
    }

    getLenderId(lenderName, lenders){
        for(let i = 0; i < lenders.length; i++){
            if (lenderName == lenders[i].name)
                return lenders[i].id;
        }

        return null;
    }

    renderWithOneTable(){
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
                            this.state.calculationDetailsValues.map(columnValues =>(
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
                                                        <Select>
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

    renderWithThreeTables(){
        let tables = [];

        for(let lenderCalculationDetailsValues of this.state.calculationDetailsValues){
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
                                        <StyledTableCell>{row}</StyledTableCell>
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
        if (this.props.filtersInputs != undefined && this.props.filtersInputs.length > 0){
            if (this.props.isBigScreen){
                return this.renderWithOneTable();
            }else{
                return this.renderWithThreeTables();
            }
        }else{
            return null;
        }
    }
}

export default CarCalculation;