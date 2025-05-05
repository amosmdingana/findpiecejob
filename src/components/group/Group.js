import { Component } from "react";
import "./Group.css"

export default class Group extends Component{
    render(){
        var className = this.props.className? this.props.className : "group";
        return <div className={className}>
               <div className="group-label">{this.props.label}</div>
               <div className="group-items">
                   {this.props.children}
               </div>
            </div>
    }
}