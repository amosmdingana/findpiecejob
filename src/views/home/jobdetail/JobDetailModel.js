import ComponentModel from "../../components/property/ComponentModel";
import SelectInputModel from "../../components/selectinput/SelectInputModel";

export default class JobDetailModel extends ComponentModel{
    constructor(props){
      super();
      this.catagories = [];
      this.catagories.push({key:"plumbing", description:"Plumbing", icon:"plumbing"});
      this.catagories.push({key:"electricity", description:"Electricity", icon:"electricity"});
      this.catagories.push({key:"carpentry", description:"Carpentry", icon:"carpentry"});
      this.catagories.push({key:"aircon", description:"Air Con", icon:"air"});
      this.catagories.push({key:"painting", description:"Painting", icon:"painting"});
      this.catagories.push({key:"paving", description:"Paving", icon:"paving"});
      this.catagory = new SelectInputModel();
      //  props.data = this;
    }


    onCardClick(card){
      window.location.assign("/piecejob/detail")
    }
}

