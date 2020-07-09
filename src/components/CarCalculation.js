import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LenderInputModalDialog from "./LenderInputModalDialog";
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


class CarCalculation extends React.Component {
    constructor(props) {
        super(props);

        this.tableHeaders = [
            "Lender",
            "Tier",
            "Advance",
            "Interest",
            "Term",
            "Payment",
            "Back",
            "Front",
            "Profit",
            "Actions"
        ];

        this.selectInterest = this.selectInterest.bind(this);
        this.deleteLenderInput = this.deleteLenderInput.bind(this);
        this.addLender = this.addLender.bind(this);
    }

    selectInterest(event, lenderInputIndex){
        this.props.selectInterest(this.props.details, lenderInputIndex, event.target.value);
    }

    formatValue(val, isCurrency){
        if(val != null && val !== "NOT_FOUND" && val !== ""){
            if(isCurrency) {
                if (val < 0) {
                    return "-$" + -val;
                } else {
                    return "$" + val;
                }
            }
        }else{
            if (val == "NOT_FOUND")
                return "-";
        }

        return val;
    }

    deleteLenderInput(lenderInputIndex){
        this.props.deleteLenderInput(lenderInputIndex);
    }

    addLender(){
        this.props.openLenderInputDialog();
    }

    renderAsManyTables(lenderInputsCalculation){
        return lenderInputsCalculation.map((lenderInputCalculation, lenderInputIndex) =>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Value</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell>Lender</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["lender"])}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Tier</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["tier"])}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Advance</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["advance"])}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Interest</StyledTableCell>
                        <StyledTableCell>
                            <Select value={lenderInputCalculation["interest"]} onChange={(event) => this.selectInterest(event, lenderInputIndex)}>
                            {
                                lenderInputCalculation["interestList"].map(interest => {
                                    return <MenuItem value={interest}>{interest}</MenuItem>
                                })
                            }
                            </Select>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Term</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["term"])}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Payment</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["payment"], true)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Back</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["back"], true)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Front</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["front"], true)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Profit</StyledTableCell>
                        <StyledTableCell>{this.formatValue(lenderInputCalculation["profit"], true)}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colspan={2} style={{textAlign: "center"}}>
                            <IconButton
                                onClick={(event) => this.deleteLenderInput(lenderInputIndex)} className={"delete_lender_btn"}><DeleteIcon/></IconButton>
                        </StyledTableCell>

                    </StyledTableRow>
                </TableBody>
            </Table>
        );
    }

    renderAsOneTable(lenderInputsCalculation){
        return (
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {
                            this.tableHeaders.map((tableHeader) => {
                                return (
                                    <StyledTableCell>
                                        {tableHeader}
                                    </StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                        lenderInputsCalculation.map((lenderInputCalculation, lenderInputIndex) => {
                            return (<StyledTableRow>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["lender"])}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["tier"])}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["advance"])}</StyledTableCell>
                                <StyledTableCell>
                                    <Select value={lenderInputCalculation["interest"]} onChange={(event) => this.selectInterest(event, lenderInputIndex)}>
                                        {
                                            lenderInputCalculation["interestList"].map(interest => {
                                                return <MenuItem value={interest}>{interest}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["term"])}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["payment"], true)}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["back"], true)}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["front"], true)}</StyledTableCell>
                                <StyledTableCell>{this.formatValue(lenderInputCalculation["profit"], true)}</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton
                                        onClick={(event) => this.deleteLenderInput(lenderInputIndex)} className={"delete_lender_btn"}><DeleteIcon/></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>);
                        })
                    }
                </TableBody>
            </Table>
        );
    }

    render(){
        console.log("render calculation");
        let lenderInputsCalculation = [];

        this.props.lenderInputs.map((lenderInput, lenderInputIndex) => {
            let carCalculation = this.props.details["car_calculation"][lenderInputIndex];
            let interestList = carCalculation["interestList"];

            lenderInputsCalculation.push({
                "lender":lenderInput["selectedLender"],
                "tier":lenderInput["selectedTier"],
                "advance":carCalculation["advance"],
                "interest":carCalculation["interest"],
                "interestList":interestList,
                "term":carCalculation["term"],
                "payment":lenderInput["payment"],
                "back":carCalculation["back"],
                "front":carCalculation["front"],
                "profit":carCalculation["profit"]
            });
        });

        return (
            <>
            <Grid container>
                <Grid item xs={12}>
                    {this.props.screenData["mdUp"]?this.renderAsOneTable(lenderInputsCalculation):this.renderAsManyTables(lenderInputsCalculation)}
                </Grid>
                <Grid item xs={12} style={{textAlign: "right"}}>
                    <Button color={"primary"} variant={"contained"} onClick={this.addLender}><AddIcon/>Add Lender</Button>
                </Grid>
            </Grid>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lenderInputs:state["lenderInputs"],
        screenData:state["screenData"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectInterest: (carDetail, lenderInputIndex, interest) => {
            dispatch(
                {
                    type: "SELECT_INTEREST",
                    carDetail:carDetail,
                    lenderInputIndex:lenderInputIndex,
                    interest:interest
                }
            )
        },
        deleteLenderInput: (lenderInputIndex) => {
            dispatch({
                type:"DELETE_LENDER_INPUT",
                index:lenderInputIndex
            })
        },
        openLenderInputDialog: () => {
            dispatch({
                type:"OPEN_LENDER_INPUT_DIALOG"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarCalculation);