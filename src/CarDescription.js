import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default class CarDescription extends React.Component{
    render(){
        return (
            <div>
                <Table>
                    {this.props.details.map(row => (
                        row.name == "title"?
                            (
                                <TableRow>
                                    <TableCell colSpan={2} style={{textAlign:"center"}}>{row.value}</TableCell>
                                </TableRow>
                            ):
                            (
                                <TableRow>
                                    <TableCell style={{padding:"0px"}}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{padding:"0px"}}>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            )
                    ))}
                </Table>
            </div>
        )
    }
}