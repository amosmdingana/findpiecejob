import { Component } from "react";


export default class VGroup extends Component{
    render(){
        return <div className="vgroup">
               {this.props.children}
            </div>
    }
}