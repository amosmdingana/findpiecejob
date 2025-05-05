
import {Component} from "react";
import "./MainMenu.css";
import MainMenuItem from "./MainMenuItem";
import Icon from "../../components/icon/Icon";
export default class MainMenu extends Component{

    render() {
        return <div className="mainmenu">
              <Icon className="mainmenu-logo" name="logo.png" />
              <div className="mainmenu-items">
              <MainMenuItem label="Catalog"/>
              <MainMenuItem label="My Activity"/>
              </div>
        </div>
    }


}
