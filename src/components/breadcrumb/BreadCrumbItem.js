import { Component } from "react";
import "./BreadCrumb.css"

export default class BreadCrumbItem extends Component{
    render(){
        var className = this.props.className? this.props.className : "breadcrumb-item";
        return <div className={className}>
                  <div className={className + "-label"}>{this.props.label}</div>
            </div>
    }
}