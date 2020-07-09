import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LenderInput from "./LenderInput";
import {connect} from "react-redux";

class LenderInputDialog extends React.Component {
    constructor(props) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.lenderAdded = this.lenderAdded.bind(this);
    }

    closeDialog(){
        this.props.closeLenderInputDialog();
    }

    lenderAdded(){
        this.props.closeLenderInputDialog();
    }

    render(){
        return (
            <Dialog  open={this.props.lenderInputDialogOpen}
                         onClose={this.closeDialog}>
            <DialogTitle>Add Lender</DialogTitle>
            <DialogContent>
                <DialogContentText>Please enter full information for new lender</DialogContentText>
                <LenderInput onChange={this.lenderAdded}/>
            </DialogContent>
        </Dialog>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lenderInputDialogOpen:state["lenderInputDialogOpen"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeLenderInputDialog: () => {
            dispatch({
                type:"CLOSE_LENDER_INPUT_DIALOG"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderInputDialog);