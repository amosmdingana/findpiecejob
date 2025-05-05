import { Component } from "react";
import "./HGroup.css"

export default class HGroup extends Component{
    render(){
        var className = this.props.className? this.props.className : "hgroup";
        return <div className={className}>
               {this.props.children}
            </div>
    }
}