import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, getIn } from 'immutable';
import EntityTypeListComponent from '../../../components/EntityTypeListComponent';
import PropertyTypeListComponent from '../../../components/PropertyTypeListComponent';

class NamespaceContainer extends Component {

    render() {
        return (
            <div>
                <a
                    data-toggle='collapse'
                    href={`#collapse${this.props.namespace}`}
                    aria-expanded='false'
                    aria-controls={`collapse${this.props.namespace}`}>
                    <li className='list-group-item'>
                        <ul className='list-group'>{this.props.namespace}</ul>
                    </li>
                </a>
                <div className='collapse' id={`collapse${this.props.namespace}`}>
                    <ul className='list-group'>
                        <EntityTypeListComponent namespace={this.props.namespace} entityTypes={this.props.entityTypes[this.props.namespace]} />
                        <PropertyTypeListComponent namespace={this.props.namespace} propertyTypes={this.props.propertyTypes[this.props.namespace]} />
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        entityTypes: state.getIn(['app', 'entityTypes'], Map()),
        propertyTypes: state.getIn(['app', 'propertyTypes'], Map())
    }
}
export default connect(mapStateToProps)(NamespaceContainer)