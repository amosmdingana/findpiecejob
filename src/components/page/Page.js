import { Component } from 'react';

export default class Page  extends Component {

 render() {
    return <div className='page'>
            {this.props.children}
    </div>;
 }
}


