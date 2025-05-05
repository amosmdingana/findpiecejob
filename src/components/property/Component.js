import React from 'react';


export default class Component extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.viewModel(props);
        this.data._view = this;
        this.state = this.data.getState();
    }

    render() {
        // property change
        this.rendering = true;
        /*if (this.toString() == "FMEstimateAdjustmentDetailView") {
            console.log("renier rendering1", this.props)
            
        }*/
        this.data.attach(this.props); // attach props

        if (this.hasUpdates) {// overwrite with internal state
            this.data.attach(this.state);
        }

        this.data.validate();
        if (this.data.hasErrors() && this.data._parent) {
            this.data._parent._childrenHasErrors = true;
            this.data._parent._childWithErrors = this;
            this.data._parent.validate();
        }

        this.data._view = this;
        var content = this.irender();
        this.rendering = false;
        /*if (this.toString() == "FMEstimateAdjustmentDetailView")
            console.log("rendering ended")*/
        this.hasUpdates = false;

        return content;
    }


    componentWillMount(props) {
        this.data.load(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match && this.data.match && prevProps.match.params !== this.data.match.params) {
            document.params = this.props.match.params;
            this.data.load();
        }
    }

    update() {
        if (this.rendering) return;
        this.hasUpdates = true;
        this.setState(this.data.getState()); // update state with data state
    }

    commit() {
        this.hasUpdates = false;
        this.data.commit();
    }

    irender() {
        throw "No irender method specified for component " + this;
    }

    viewModel(props) {
        throw "No view model specified for component " + this;
    }

}