import { Component } from "react";
import "./PageContent.css"
export default class PageContent extends Component {
    render() {
        return <div className="pagecontent">
            {this.props.children}
        </div>
    }
}