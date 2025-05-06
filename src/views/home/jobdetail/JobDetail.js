import MainMenu from "../../menus/mainmenu/MainMenu";
import MainMenuItem from "../../menus/mainmenu/MainMenuItem";
import Page from "../../components/page/Page.js"
import HGroup from "../../components/hgroup/HGroup";
import PageContent from "../../components/page/PageContent";
import Button from "../../components/button/Button";
import TextInput from "../../components/textinput/TextInput";
import Image from "../../components/image/Image";
import SelectInput from "../../components/selectinput/SelectInput";
import Card from "../../components/card/Card";
import Group from "../../components/group/Group";
import Component from "../../components/property/Component";
import JobDetailModel from "./JobDetailModel";
export default class  JobDetail extends Component{
   render() {

      var vm = this.data;

       return <div className="jobdetail">
                 <Page>
                      <MainMenu/>
                      <PageContent>
                      </PageContent>
                 </Page>
       </div>
       
      }

      constructor(props) {
        super(props);
        if (!document.history && this.props.history) document.history = this.props.history;
       // document.params = this.props.match.params;
    
      }

      viewModel(props) {
        return new JobDetailModel(props);
      }

      onCardClick(data){
        console.log("Onclick here")
        console.log(data);
        this.data.onCardClick(data);
      }
}

