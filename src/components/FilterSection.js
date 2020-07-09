import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import './FilterSection.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

class FilterSection extends React.Component {
    constructor(props) {
        super(props);

        this.expandOrCollapse = this.expandOrCollapse.bind(this);
    }

    expandOrCollapse(){
        this.props.expandOrCollapse(!this.props.isExpanded);
    }

    render(){
        return (
            <Grid container className={"filter_section"}>
                <Grid item xs={12} className={"filter_section_header"}>
                    <Grid container>
                        <Grid item xs={10} onClick={this.expandOrCollapse} className={"filter_section_title"}>
                            {this.props.title}
                        </Grid>
                        <Grid item xs={2} className={"filter_section_expand_collapse_icon"}>
                            <IconButton onClick={this.expandOrCollapse}>{this.props.isExpanded?<ExpandLessIcon/>:<ExpandMoreIcon/>}</IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={this.props.isExpanded}>
                        {this.props.children}
                    </Collapse>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isExpanded: state[ownProps["name"] + "_expand"]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        expandOrCollapse: (newVal) => {
            dispatch({
                type:"EXPAND_OR_COLLAPSE_FILTER_SECTION",
                name: ownProps["name"],
                value:newVal
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);