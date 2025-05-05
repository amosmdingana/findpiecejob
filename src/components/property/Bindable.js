import Component from "./Component";

/**
 * Creates an bindable model
 */
export default class Bindable {

    constructor(props, data) {
        if (props) {
            this._parent = props._parent ? props._parent : null;
            this._parentField = props._parentField ? props._parentField : null;
        }
        this.errors = [];
        this.attach(props);

        this._dataFields = data;

        var proxy = new Proxy(this, {
            /*get(target, propKey, receiver) {
                if (propKey == '$$typeof' || propKey.toString() === 'Symbol(Symbol.iterator)' || propKey.toString() === 'Symbol(Symbol.toStringTag)') return Reflect.get(target, propKey, receiver)

                if (!(propKey in target)) {
                   var value = {
                       parent: target,
                       parentField: propKey,
                       toString: function() {
                           return value;
                       }
                   }
                   console.log(propKey);
                   Reflect.set(target, propKey, value, receiver)
                }
                return Reflect.get(target, propKey, receiver);
            },*/
            set(target, propKey, value, receiver) {
                if (target[propKey] && target[propKey] === value) return true;

                //Reflect.set(target, 'datachanged', true, receiver);

                if (value && value instanceof Bindable && propKey[0] !== '_' && propKey !== 'data') {
                    value._parent = target;
                    value._parentField = propKey;
                }

                if (value && value instanceof Component && propKey[0] !== '_' && propKey !== 'data') {
                    value._parent = target;
                    value._parentField = propKey;
                }

                return Reflect.set(target, propKey, value, receiver);
            },


        });

        proxy._class = this.constructor.name
        proxy._key = this.createUUID();
        return proxy;
    }

    onCommit(obj) {
        var fn = this['set' + obj._parentField.substring(0, 1).toUpperCase() + obj._parentField.substring(1)];
        if (fn) {
            fn = fn.bind(this);
            fn(obj);
            this.commit();
            return;
        }

        this[obj._parentField] = obj;
        this.commit();
    }

    commit() {
        //var err = new Error();
        //console.log("Renier td", err.stack)
        if (this._parent && this._parent != null) {
            this._parent.onCommit(this);
        }
    }

    /**
     * Filters out unneccesary fields to be transported via http
     */

    detach() {
        return this._detach(this);
    }

    _detach(obj) {

        if (obj == null || obj === undefined) return null;
        if (obj !== Object(obj)) return obj;
        if (obj && Array.isArray(obj)) {
            var items = [];
            for (let k = 0; k < obj.length; k++) {
                items.push(this._detach(obj[k]));
            }
            return items;
        }

        var data = {};
        if (Object.prototype.hasOwnProperty.call(obj, "_dataFields") && obj._dataFields && obj._dataFields.length > 0) {
            for (let index = 0; index < obj._dataFields.length; index++) {
                const prop = obj._dataFields[index];
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    data[prop] = this._detach(obj[prop]);
                }
            }
            return data;
        }

        var data = {};
        for (var prop in obj) {
            if (prop === 'detach' || prop[0] === '_') continue;

            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                var p = this._detach(obj[prop]);
                if (typeof p !== 'undefined') {
                    data[prop] = p;
                }
            }
        }
        return data;

    }

    attach(props) {
        this.log("Attaching2 ", this);
        if (!props) return;

        // run through props
        this.log("Traversing props: ", props);
        this._attachData(props);

        this.log("Traversing data: ", props.data);
        this._attachData(props && props.data ? props.data : {});

        this.log("Traversing reference data: ", props.referenceData);
        this._attachData(props && props.referenceData ? props.referenceData : {});
    }

    _attachData(data) {

        //this._parent = data._parent ? data._parent : this._parent;
        //this._parentField = data._parentField ? data._parentField : this._parentField;
        for (var prop in data) {
            this.log("Found prop: '" + prop + "' in data", data);
            if (prop[0] === '_' || prop === 'detach' || prop === 'data') continue;
            if (Object.prototype.hasOwnProperty.call(data, prop)) {
                this.log("Attempting to set prop: '" + prop + "' with props.data", data);
                var p = this[prop];
                if (p && p['attach']) {
                    this.log("Attaching " + prop);
                    p.attach(data[prop]);
                } else {
                    p = data[prop];
                    if (p && Array.isArray(p)) {
                        // we have an array

                        // we need to do something special, let see if there is a special setter for array
                        var setter = this['set' + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
                        if (setter) {
                            setter = setter.bind(this);
                            setter(p);
                            continue;
                        }

                    }

                    // set p to undefined
                    if (p === null) p = undefined;

                    // setting parent
                    if (p && Object.prototype.hasOwnProperty.call(p, '_parent')) {
                        if (this.skipParentBinding()) {

                        } else {
                            //if (!p._parent) {
                            p._parent = this;
                            p._parentField = prop;
                            //}
                        }
                    }

                    this[prop] = p;
                    this.log("Overwriting " + prop + " with value '" + p + "'", p);
                }
            }
        }
    }

    skipParentBinding() {
        return false;
    }

    validate() {
        return true;
    }

    hasErrors() {
        if (this && this.errors && this.errors.length > 0) return true;
        return false;
    }

    log(msg, obj) {
        //console.log(msg, obj)
    }

    checksum() {
        if (this._checksum) {
            return this._checksum;
        }

        var MD5 = new MD5();

        this._checksum = MD5.md5(JSON.stringify(this.detach()));
        return this._checksum;
    }

    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    findAllErrors() {
        var id = this.createUUID();
        return this._findAllErrors(id, null, this)
    }

    _findAllErrors(id, prop, obj) {

        if (obj == null || obj === undefined) return [];
        if (prop == "errors") return obj;
        if (obj !== Object(obj)) return [];
        if (obj && Array.isArray(obj)) {
            var items = [];
            for (let k = 0; k < obj.length; k++) {
                items = items.concat(this._findAllErrors(id, k, obj[k]));
            }

            return items;
        }

        var errors = [];
        if (Object.prototype.hasOwnProperty.call(obj, "_dataFields") && obj._dataFields && obj._dataFields.length > 0) {
            for (let index = 0; index < obj._dataFields.length; index++) {
                const prop = obj._dataFields[index];
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    errors = errors.concat(this._findAllErrors(id, prop, obj[prop]));
                }
            }
            return errors;
        }

        var errors = [];
        for (var prop in obj) {
            if (prop === 'detach' || prop[0] === '_') continue;

            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                errors = errors.concat(this._findAllErrors(id, prop, obj[prop]));
            }
        }
        return errors;
    }

    printParents() {
        var s = "";

        if (this._parent && this._parent != null) {

            s = this._parent.printParents();
        }



        return s + '->' + this._class + "(" + this._key + ")";
    }

    printChildren() {
        return JSON.stringify(this._printChildren(this));
    }

    _printChildren(obj) {
        if (obj == null || obj === undefined) return null;
        if (obj !== Object(obj)) return obj;
        if (obj && Array.isArray(obj)) {
            var items = [];
            for (let k = 0; k < obj.length; k++) {
                items.push(this._printChildren(obj[k]));
            }
            return items;
        }

        var s = {};
        for (var prop in obj) {
            if (prop == "_class" || prop == "_key") {
                s[prop] = obj[prop];
                continue;
            }

            if (prop[0] == "_") {
                continue;
            }

            if (obj[prop]) {
                s[prop] = this._printChildren(obj[prop]);
                continue;
            }
        }
        return s;
    }
}