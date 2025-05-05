import { Component } from "react";
import "./Card.css"
import Icon from "../icon/Icon";

export default class Card extends Component{
    render(){
        var className = this.props.className? this.props.className : "card";

        return <div className={className} onClick={this.onClick.bind(this)}>
                   {this.renderIcon()}
                   <p>{this.props.description}</p>
             </div>
    }

    renderIcon(){
        var iconName = this.props.iconName+".png";
       return <Icon name={iconName} /> 
    }

    onClick(e){
      console.log(e);
      if(this.props.onClick){
        this.props.onClick(this.props.data);
        return;
      }
      console.log("card is clicked");
    }
}