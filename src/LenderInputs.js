import React from 'react';
import Grid from "@material-ui/core/Grid";
import { IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { Paper } from '@material-ui/core';

class LenderInputs extends React.Component {
    constructor(props) {
        super(props);
    }

    keyToTitle(key){
        let result = key.replace('_',' ');

        return result
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    render(){
        return (
        <Paper style={{padding:10}}>
            <Grid container>
                <Grid item xs={12} align={"right"}>
                    <IconButton color="secondary" onClick={this.props.handleDeleteBtnClick}>
                        <Close />
                    </IconButton>
                </Grid>
                {
                    Object.keys(this.props.inputs).map(input =>
                        <React.Fragment>
                            <Grid item xs={6}>
                            {this.keyToTitle(input)}
                            </Grid>
                            <Grid item xs={6}>
                                {this.props.inputs[input]}
                            </Grid>
                        </React.Fragment>)
                }
        </Grid>
        </Paper>);
    }
}

export default LenderInputs;