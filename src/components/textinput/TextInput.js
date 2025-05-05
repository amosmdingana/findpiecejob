import { Component } from "react";
import "./TextInput.css"
export default class TextInput extends Component {
    render() {
        var className = this.props.className ? "textinput-" + this.props.className : "textinput"
        var input = <input id="click" title="age" className="click" type="text" value={this.value} />
        var searchbutton = "";
        var searchInput = "";
        if (className == "textinput-search") {
            searchbutton = <button className="search-button" name={this.props.label}>Search</button>
            searchInput = <input id="click" title="age" className="search" type="search" value={this.value} placeholder="Hello, how can I help you?"/>
            input = "";
        }
        return <div className={className}>
            {input}
            {searchInput}
            {searchbutton}
        </div>
    }
}