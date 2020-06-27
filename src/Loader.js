import {css} from "@emotion/core";
import * as React from "react";
import {ClipLoader} from "react-spinners";

const clipLoaderCss = css`
    border-color:rgb(55,71,172);
    position:absolute;
    border-bottom-color:transparent;
    top:50%;
`;

class Loader extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isVisible:true
        }

        this.hideLoader = this.hideLoader.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: true}, this.hideLoader);
    }

    hideLoader(){
        if(this.props.timeout)
            setTimeout(() => {
                this.setState({isVisible:false})
            }, this.props.timeout);
    }

    componentDidMount() {
        this.hideLoader();
    }

    render(){
        return this.state.isVisible?<div style={{display:'flex', justifyContent:'center'}}><ClipLoader css={clipLoaderCss}/></div>:this.props.children;
    }
}

export default Loader;