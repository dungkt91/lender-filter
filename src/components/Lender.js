import React from 'react';
import LenderInput from "./LenderInput";
import "./Lender.css";
import LenderInputs from "./LenderInputs";

class Lender extends React.Component {
    render(){
        return (
            <>
                <div className={"lender"}>
                    <LenderInput />
                    <LenderInputs />
                </div>
            </>
        )
    }
}

export default Lender;