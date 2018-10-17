import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, getIn } from 'immutable';

class NamespaceContainer extends Component {
    insertEntities = () => {
        if (this.props.entityTypes) {
            if (this.props.entityTypes[this.props.namespace]) {
                return this.props.entityTypes[this.props.namespace].map((entityType) => {
                    return <li className='list-group-item' key={entityType.title}>{entityType.title}</li>
                })
            }
        }
    }

    render() {
        return (
            <div><a data-toggle='collapse' data-target={`#collapse${this.props.namespace}`} aria-expanded='false' aria-controls={`collapse${this.props.namespace}`}>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                    <ul className='list-group'>{this.props.namespace}</ul>
                    <span className='badge badge-primary badge-pill'>{this.props.entityTypes[this.props.namespace] ? this.props.entityTypes[this.props.namespace].length : ''}</span>
                </li>
            </a>
                <div className='collapse' id={`collapse${this.props.namespace}`}>
                    <ul className='list-group'>
                        {this.insertEntities()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        entityTypes: state.getIn(['app', 'entityTypes'], Map())
    }
}
export default connect(mapStateToProps)(NamespaceContainer)