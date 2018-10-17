import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Map, List, getIn} from 'immutable';

type Props = {
    namespaces: Array<string>
}

class NamespacesContainer extends Component<Props> {

    formatNamespaces () {
        if(this.props.namespaces.length > 0) {
            return this.props.namespaces.map((namespace) => {
                return <li key={namespace}>{namespace}</li>
            })
        }
    }

    render() {
        return <ul>{this.formatNamespaces()}</ul>
    }
}

function mapStateToProps(state) {
    return { namespaces: state.getIn(['app','namespaces'], List()) };
}
export default connect(mapStateToProps)(NamespacesContainer);