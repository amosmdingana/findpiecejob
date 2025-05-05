import Component from "../property/Component";
import "./SelectInput.css"
import SelectInputModel from "./SelectInputModel";
export default class SelectInput extends Component {

    constructor(props){
        super(props);
        this.keyDownFn = function (e) {
            if (e.target === this.input && e.keyCode != 9) {
                return true;
            }

            if (e.target === this.input && e.keyCode == 9) {
                if (this.input.value && this.input.value != "") {

                    this.filterItems();
                    var item = this.data.filteredItems[0]
                    if (typeof (item) != 'undefined') {
                        this.data.setSelected(item);
                    }

                    if (this.props.onChange) {
                        this.props.onChange(this.data, item);
                    }
                }
                return true;
            }
        }.bind(this);

    }
    render() {
            var items = this.props.dataProvider? this.props.dataProvider : [];
        return <div className="selectinput">
                  <select  id="options" name="options" onChange={this.select.bind(this)}>
               
                  <option value=""  hidden>{this.props.label}</option>
                  {items.map(item => (
                       <option value={item.key}>{item.description}</option>
                  ))}
            </select>
        </div>
    }


    viewModel(props){
        return new SelectInputModel(props);
    }

    select(e) {
        console.log("I am selected");
        console.log(e);
        var data = {};
        data.selected = {};
        data.selected.key = e.target.value;
        data.selected.description = e.target.selectedOptions.value;
        data.selected.description = e.currentTarget.selectedOptions[0].innerText
        this.data.setSelected(data);
       /* this.hideMenu();
        this.commit();
        if (this.props.onChange) {
            this.props.onChange(this.data, item);
        }*/

    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.keyDownFn, true);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownFn, true);
    }

}