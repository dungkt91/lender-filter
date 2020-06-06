import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class CarDescription extends React.Component {
    getCarTitle() {
        let year = this.getRowValue('YEAR');
        let make = this.getRowValue('MAKE');
        let model = this.getRowValue('MODEL');
        let trim = this.getRowValue('TRIM');

        return `${year} ${make} ${model} ${trim}`;
    }

    getRowValue(rowName){
        let row = this.getRowWithName(rowName);

        if (row != null){
            return row.value;
        }

        return '';
    }

    getRowWithName(rowName){
        let matches = this.props.details.filter(row => (row.name == rowName));

        if (matches.length > 0){
            return matches[0];
        }

        return null;
    }
    render() {
        return (
            <Paper style={{padding: "20px", backgroundColor: "rgb(247, 248, 248)"}}>
                <Table>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}><b
                            style={{fontSize: "1.2rem"}}>{this.getCarTitle()}</b></TableCell>
                    </TableRow>
                    {this.props.details.map(row => (
                        <TableRow>
                            <TableCell style={{padding: "0px"}}>
                                <b>{row.name}</b>
                            </TableCell>
                            <TableCell style={{padding: "0px"}}>
                                {row.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Paper>
        )
    }
}