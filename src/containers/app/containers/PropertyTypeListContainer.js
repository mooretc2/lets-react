import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {propertyTypeSelected} from '../actions/AppActions'

class PropertyTypeListContainer extends Component {

    handleClick = (event) => {
        console.log(event.target.id)
        this.props.actions.propertyTypeSelected(event.target.id);
    }

    insertProperties() {
        if (this.props.propertyTypes) {
            return this.props.propertyTypes.map((propertyType) => {
                return (
                    <li
                        className='list-group-item'
                        id={propertyType.id}
                        key={propertyType.id}
                        style={{ paddingLeft: '60px' }}
                        onClick={this.handleClick}>
                        {propertyType.title}
                    </li>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <a data-toggle='collapse'
                    className='list-group-item d-flex justify-content-between align-items-center'
                    href={`#collapse${this.props.namespace}properties`}
                    aria-expanded='false'
                    aria-controls={`collapse${this.props.namespace}properties`}
                    style={{ paddingLeft: '40px' }}>
                    Property Types
                    <span className='badge badge-primary badge-pill'>{this.props.propertyTypes ? this.props.propertyTypes.length : 0}</span>
                </a>
                <div className='collapse' id={`collapse${this.props.namespace}properties`}>
                    <ul className='list-group'>
                        {this.insertProperties()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ propertyTypeSelected }, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(PropertyTypeListContainer);