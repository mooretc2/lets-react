import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { entityTypeSelected } from '../actions/AppActions'

class EntityTypeListContainer extends Component {
    handleClick = (event) => {
        console.log(event.target.id)
        this.props.actions.entityTypeSelected(event.target.id);
    }

    insertEntities() {
        if (this.props.entityTypes) {
            return this.props.entityTypes.map((entityType) => {
                return <li
                    className='list-group-item'
                    key={entityType.id}
                    id={entityType.id}
                    style={{ paddingLeft: '60px' }}
                    onClick={this.handleClick}>
                    {entityType.title}
                </li>
            })
        }
    }

    render() {
        return (
            <div>
                <a data-toggle='collapse'
                    className='list-group-item d-flex justify-content-between align-items-center'
                    href={`#collapse${this.props.namespace}entities`}
                    aria-expanded='false'
                    aria-controls={`collapse${this.props.namespace}entities`}
                    style={{ paddingLeft: '40px' }}>
                    Entity Types
                    <span className='badge badge-primary badge-pill'>{this.props.entityTypes ? this.props.entityTypes.length : 0}</span>
                </a>
                <div className='collapse' id={`collapse${this.props.namespace}entities`}>
                    <ul className='list-group'>
                        {this.insertEntities()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ entityTypeSelected }, dispatch)
    }
}

export default connect(null, mapDispatchToProps) (EntityTypeListContainer);