import { Component } from "react";
import "./MainMenuItem.css";

export default class MainMenuItem extends Component {
    render() {
        var label = this.props.label;
        return <div className="mainmenu-item">
                <p>{label}</p>
        </div>
    }
}