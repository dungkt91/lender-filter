import * as React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

export default class CarCalculation extends React.Component{
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

        this.calculationDetailsColumnValues = [
            ["lender_value", "tier_value", "1", "2", "3", "4", "5", "6", "7"],
            ["lender_value1", "tier_value1", "1", "2", "3", "4", "5", "6", "7"],
            ["lender_value2", "tier_value2", "1", "2", "3", "4", "5", "6", "7"]
        ]
    }
    render(){
        return (
            <Paper style={{padding:"20px", backgroundColor:"rgb(247, 248, 248)"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.calculationDetailsColumnHeaders.map(header =>(
                             <TableCell>
                                 {header}
                             </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {this.calculationDetailsColumnValues.map(rowValues =>
                                (
                                    <TableRow>
                                        {
                                            rowValues.map(rowValue =>
                                                (
                                                    <TableCell>
                                                        {rowValue}
                                                    </TableCell>
                                                )
                                            )
                                        }
                                    </TableRow>
                                )
                            )
                        }
                </Table>
            </Paper>
        )
    }
}