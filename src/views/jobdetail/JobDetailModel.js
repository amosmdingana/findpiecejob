import SelectInputModel from "../../components/selectinput/SelectInputModel";
import ComponentModel from "../../components/property/ComponentModel";

export default class JobDetailModel extends ComponentModel{
    constructor(props){
      super();

      this.catagory = new SelectInputModel();
      //  props.data = this;
    }

    load(){
      console.log("Job detail loaded....");
    }
}

