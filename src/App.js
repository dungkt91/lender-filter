import React from 'react';
import './App.css';
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "react-scroll-to-top/lib/index.css";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CarPage from "./CarPage";

const App = (props) => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    return <AppClass isBigScreen={mdUp}/>
}


class AppClass extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/car">
                        <CarPage isBigScreen={this.props.isBigScreen} />
                    </Route>
                    <Route path="/">
                        <HomePage isBigScreen={this.props.isBigScreen}/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
