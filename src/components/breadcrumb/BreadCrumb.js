import { Component } from "react";
import "./BreadCrumb.css"

export default class BreadCrumb extends Component{
    render(){
        var className = this.props.className? this.props.className : "breadcrumb";
        return <div className={className}>
               <div className="breadcrumb-items">
                   {this.props.children}
               </div>
            </div>
    }
}