import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import BreadCrumbItem from "../../components/breadcrumb/BreadCrumbItem";
import Page from "../../components/page/Page";
import PageContent from "../../components/page/PageContent";
import Component from "../../components/property/Component";
import MainMenu from "../../menus/mainmenu/MainMenu";
import JobDetailModel from "./JobDetailModel";
export default class  JobDetail extends Component{
   render() {

      var vm = this.data;

       return <div className="jobdetail">
                 <Page>
                      <MainMenu/>
                      <PageContent>
                        <BreadCrumb>
                         <BreadCrumbItem  label="Detail"/>
                        </BreadCrumb>
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

