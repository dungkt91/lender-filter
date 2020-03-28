import * as React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";

const CarCalculation = (props)=>{
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <CarCalculationClass isBigScreen={mdUp} />
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

        this.calculationDetailsValues = [
            ["lender_value", "tier_value", "1", "2", "3", "4", "5", "6", "7"],
            ["lender_value1", "tier_value1", "1", "2", "3", "4", "5", "6", "7"],
            ["lender_value2", "tier_value2", "1", "2", "3", "4", "5", "6", "7"]
        ]
    }

    renderWithOneTable(){
        console.log('Test Arr ' + this.calculationDetailsColumnHeaders);

        return (
            <React.Fragment>
                <Paper style={{backgroundColor:"rgb(247, 248, 248)"}}>
                    <Table>
                        <TableHead>
                                <TableRow>
                                {this.calculationDetailsColumnHeaders.map(header => (
                                    <TableCell>{header}</TableCell>
                                ))}
                                </TableRow>
                        </TableHead>
                        {
                            this.calculationDetailsValues.map(columnValues =>(
                                <TableRow>
                                    {
                                        columnValues.map(columnValue => (
                                            <TableCell>
                                                {columnValue}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }

    renderWithThreeTables(){
        let tables = [];

        for(let lenderCalculationDetailsValues of this.calculationDetailsValues){
            tables.push(
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:"rgb(247, 248, 248)"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                lenderCalculationDetailsValues.map((row, index) => (
                                    <TableRow>
                                        <TableCell>{this.calculationDetailsColumnHeaders[index]}</TableCell>
                                        <TableCell>{row}</TableCell>
                                    </TableRow>
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
        if (this.props.isBigScreen){
            return this.renderWithOneTable();
        }else{
            return this.renderWithThreeTables();
        }
    }
}

export default CarCalculation;