import Bindable from "./Bindable";



export default class ComponentModel extends Bindable {

    constructor(props, data) {
        // get the model from the react props
        super(props && props.data ? props.data : props, data);

    }

    /**
     * Publish an event to the component model, see Server.js
     * Implement this method if you want to listen to specific events from Server.js
     * @param  event 
     */
    pubish(event) {

    }


    commit() {
        if (this._view) {
            this._view.update();
        }
        super.commit();
    }


    getState() {
        var state = {};
        for (var prop in this) {
            if (Object.prototype.hasOwnProperty.call(this, prop)) {
                if (prop !== 'data' || prop !== 'model') { // don't copy keywords
                    state[prop] = this[prop];
                }
            }
        }
        return { data: state };
    }

    apply(rules) {
        // looping through all values in this model, and apply the rules to each
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var rule = rules[key] ? rules[key] : {};
                for (var ruleKey in rule) {
                    if (rule.hasOwnProperty(ruleKey)) {
                        this[key][ruleKey] = rule[ruleKey];
                    }
                }
            }
        }
        return this;
    }

    load(props) {

    }


}