import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getIn, List, Map } from 'immutable';

const FocusView = styled.div`
    position: sticky;
    width: 100%;
    top: 50px;
`;

class FocusViewContainer extends Component {
    insertFocusInfo() {
        if (!this.props.selectedTypeType) {
            return null;
        } else if (this.props.selectedTypeType === 'entity') {
            return <h2>{this.props.entityTypes.find(pt => pt.id === this.props.selectedTypeId).title}</h2>
        } else {
            return <h2>{this.props.propertyTypes.find(pt => pt.id === this.props.selectedTypeId).title}</h2>
        }
    }

    render() {
        return (
            <FocusView className='jumbotron'>
                {this.insertFocusInfo()}
            </FocusView>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedTypeId: state.getIn(['app', 'selectedType']),
        selectedTypeType: state.getIn(['app', 'selectedTypeType']),
        entityTypes: state.getIn(['app', 'rawEntityTypes'], Map()),
        propertyTypes: state.getIn(['app', 'rawPropertyTypes'], Map())
    }
}

export default connect(mapStateToProps)(FocusViewContainer);