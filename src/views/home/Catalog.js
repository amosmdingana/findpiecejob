import MainMenu from "../../menus/mainmenu/MainMenu";
import MainMenuItem from "../../menus/mainmenu/MainMenuItem";
import Page from "../../components/page/Page.js"
import "./Catalog.css"
import HGroup from "../../components/hgroup/HGroup";
import PageContent from "../../components/page/PageContent";
import Button from "../../components/button/Button";
import TextInput from "../../components/textinput/TextInput";
import Image from "../../components/image/Image";
import SelectInput from "../../components/selectinput/SelectInput";
import CatalogModel from "./CatalogModel"
import Card from "../../components/card/Card";
import Group from "../../components/group/Group";
import Component from "../../components/property/Component";
export default class  Catalog extends Component{
   render() {

      var vm = this.data;

       return <div className="catalog">
                 <Page>
                      <MainMenu/>
                      <PageContent>
                        <HGroup className="search-group">
                          <SelectInput data={vm.catagory} dataProvider={vm.catagories} label="All Job Catagories"/>
                          <TextInput className="search" />
                        </HGroup>
                        <Group label="Log a Job Request">
                          { 
                            vm.catagories.map(item => (
                              <Card iconName={item.icon} data={item} description={item.description} onClick={this.onCardClick.bind(this)}/>
                            ))
                          }
                        </Group>
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
        return new CatalogModel(props);
      }

      onCardClick(data){
        console.log("Onclick here")
        console.log(data);
        this.data.onCardClick(data);
      }
}

