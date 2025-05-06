import { Component } from "react";
import "./MainMenuItem.css";

export default class MainMenuItem extends Component {
    render() {
        var label = this.props.label;
        return <div className="mainmenu-item" onClick={this.onClick.bind(this)}>
                <p>{label}</p>
        </div>
    }

    onClick(){
        window.location.assign(this.props.link)
    }
}