import React from "react";
import logo from "../logo.svg";

export default class Test extends React.Component{
    onSubmitForm = () => {
        console.log("hello")
        //send data here to the backend
    }
    
    render(){
        return (
            <form >
                <input type="text" />
                <button onClick={this.onSubmitForm}></button>
            </form>
        );
    }
}
