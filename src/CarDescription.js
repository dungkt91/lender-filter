import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import './CarDescription.css';
import Utils from "./Utils";

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
            <Grid container>
                <Grid item xs={12} className={"car_description_title"}>
                    <span>{this.getCarTitle()} - {this.getRowValue('TOTAL COST')}</span>
                </Grid>
                <Table className={"car_description_table"}>
                    <TableBody>
                {this.props.details.map(row => (
                    <TableRow>
                        <TableCell>
                            <span className={"car_description_row_header"}>{Utils.convertStr(row.name)}</span>
                        </TableCell>
                        <TableCell>
                            <span className={"car_description_row_value"}>{row.value}</span>
                        </TableCell>
                    </TableRow>
                ))}
                    </TableBody>
                </Table>
            </Grid>
        )
    }
}