import { Component } from "react";
import "./Button.css"

export default class Button extends Component{
    render(){
        return   <div className="button">
                 <button name={this.props.label} onClick={this.onClick.bind(this)}>{this.props.label}</button>
        </div> 

    }

    onClick(){
        const names: String[] = [];
        names.push("Amos");
        console.log(names);
        this.message = "Hello Work";
        this.forceUpdate();
    }
}