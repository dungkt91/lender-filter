import React from 'react';
import ScrollToTop from "react-scroll-to-top";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Menubar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render(){
        return (
            <>
                        <AppBar position="static">
                            {this.props.isBigScreen ? (
                                <React.Fragment>
                                    <Tabs>
                                        <Tab label="Home"/>
                                        <Tab label="Rate Sheet" disabled/>
                                        <Tab label="Quick Quote" disabled/>
                                        <Tab label="Lender Assist" disabled/>
                                    </Tabs>
                                </React.Fragment>) : (
                                <Toolbar>
                                    <IconButton
                                        aria-label="menu"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        style={{"color":"white"}}
                                        onClick={this.menuBtnOnClick}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.closeMenu}
                                    >
                                        <MenuItem>HOME</MenuItem>
                                        <MenuItem>RATE SHEET</MenuItem>
                                        <MenuItem>QUICK QUOTE</MenuItem>
                                        <MenuItem>LENDER ASSIST</MenuItem>
                                    </Menu>
                                </Toolbar>
                            )
                            }
                        </AppBar>
            </>
        )
    }
}

export default Menubar;