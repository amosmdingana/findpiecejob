import { Component } from "react";
export default class Image extends Component {
    render(){
        return <div className="image">
            <img className='image' src={`${process.env.PUBLIC_URL}/images/backgroup.jpg`}/>
        </div>
    }
}