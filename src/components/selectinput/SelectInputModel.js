import ComponentModel from "../property/ComponentModel";

export default class SelectInputModel extends ComponentModel{

    constructor(props) {
        super(props, ['selected', 'errors']);

        // defaults
        this.selected = this.selected ? this.selected : { key: '', description: '' };
        this.visible = 'false'

    }

    getSelectedDescription() {

        if (!this.selected) {

            return this.value;
        }
        if (typeof (this.selected.description) == 'undefined') {
            return "";
        }
        return this.selected.description;
    }

    setSelected(val) {
        if (this.selected) this.value = this.selected.description;
        else this.value = '';
        this.selected = val;
    }

    setVisible(val) {
        this.visible = val;
    }

    isVisible() {
        return this.visible == 'true' || this.visible == true;
    }

    getDirection() {
        return this.direction;
    }

    getLabel() {
        return this.label;
    }

    setDirection(val) {
        this.direction = val;
    }

    setDisabled(val) {
        this.disabled = val;
    }

    isDisabled() {
        return this.disabled;
    }

    setReadOnly(val) {
        this.readOnly = val;
    }

    isReadOnly() {
        return this.readOnly;
    }

    isRequired() {
        return this.required == 'true' || this.required == true || this.required == "true";
    }

    setRequired(val) {
        if (val === true) {
            this.required = 'true'
            return;
        }

        if (val == false) {
            this.required = 'false';
            return;
        }

        this.required = val;
    }

    validate() {
        this.errors = [];
        if (this.disabled) return;
        if (this.required === 'true' || this.required == true) {
            if (!this.selected || !this.selected.key) this.errors.push("Please select a value")
        }

        if (this.validator) {
            var msg = this.validator(this);
            if (msg) {
                this.errors.push(msg);
            }
        }
    }

    log(msg, obj) {
        // console.log(msg, obj);
    }

    is(val) {
        if (val === this.selected.key) return true;
        if (val === this.selected.description) return true;
        return false;
    }

    text() {
        if (!this.selected) return null;

        return this.selected.description;
    }

    commit() {
        super.commit();
        //console.log("renier commit", this)
    }

    selectByIndex(index) {
        console.log(this);
        var items = this.dataProvider.items;
        this.setSelected(items[index]);
        this.commit();
    }
}