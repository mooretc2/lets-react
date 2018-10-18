import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List, getIn } from 'immutable';
import NamespaceContainer from './NamespaceContainer';
import styled from 'styled-components';
import FocusViewContainer from './FocusViewContainer'

type Props = {
    namespaces: Array<string>
}

class NamespaceListContainer extends Component<Props> {

    formatNamespaces() {
        if (this.props.namespaces.length > 0) {
            return this.props.namespaces.map((namespace) => {
                return <NamespaceContainer key={namespace} namespace={namespace} />
            })
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-6'>
                    <ul className='list-group'>{this.formatNamespaces()}</ul>
                </div>
                <div className='col-sm-6'>
                        <FocusViewContainer />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        namespaces: state.getIn(['app', 'namespaces'], List())
    };
}
export default connect(mapStateToProps)(NamespaceListContainer);