import { Component } from "react";
import './Icon.css'
export default class Icon extends Component {
    render(){
        var src = process.env.PUBLIC_URL+'/icons/'+this.props.name;
        console.log("I am here "+src);
        return <div className="icon">
            <img className='icon' src={src}/>
        </div>
    }
}