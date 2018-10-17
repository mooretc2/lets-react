import React, { Component } from 'react';

export default class EntityTypeListComponent extends Component {
    insertEntities() {
        if (this.props.entityTypes) {
            return this.props.entityTypes.map((entityType) => {
                return <li className='list-group-item' key={`${entityType.title}entity`} style={{paddingLeft: '60px'}}>{entityType.title}</li>
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
                    style={{paddingLeft: '40px'}}>
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