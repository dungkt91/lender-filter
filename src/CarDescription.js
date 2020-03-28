import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class CarDescription extends React.Component{
    render(){
        return (
            <Paper style={{padding:"20px", backgroundColor:"rgb(247, 248, 248)"}}>
                <Table>
                    {this.props.details.map(row => (
                        row.name == "title"?
                            (
                                <TableRow>
                                    <TableCell colSpan={2} style={{textAlign:"center"}}><b style={{fontSize:"1.2rem"}}>{row.value}</b></TableCell>
                                </TableRow>
                            ):
                            (
                                <TableRow>
                                    <TableCell style={{padding:"0px"}}>
                                        <b>{row.name}</b>
                                    </TableCell>
                                    <TableCell style={{padding:"0px"}}>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            )
                    ))}
                </Table>
            </Paper>
        )
    }
}