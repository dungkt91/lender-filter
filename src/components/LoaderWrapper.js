import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import React from 'react';

export default class LoaderWrapper extends React.Component {
    render(){
        return (
            <Loader
                type="Oval"
                color="#3f51b5"
                height={50}
                width={50}
            />
        );
    }
}