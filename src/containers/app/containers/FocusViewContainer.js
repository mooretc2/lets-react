import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getIn, List, Map } from 'immutable';

const FocusView = styled.div`
    position: sticky;
    width: 100%;
    top: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
`;

class FocusViewContainer extends Component {
    insertFocusInfo() {
        let selected;
        if (!this.props.selectedTypeType) {
            return null;
        } else if (this.props.selectedTypeType === 'entity') {
            selected = this.props.entityTypes.find(pt => pt.id === this.props.selectedTypeId);
        } else {
            selected = this.props.propertyTypes.find(pt => pt.id === this.props.selectedTypeId);
        }
        return (
            <div>
                <h5>{selected.title ? `Title: ${selected.title}` : ''}</h5>
                <h5>{selected.description ? `Description: ${selected.description}` : ''}</h5>
                <h5>{selected.id ? `ID: ${selected.id}` : ''}</h5>
                <h5>{selected.dataType ? `Data Type: ${selected.dataType}` : ''}</h5>
                <h5>{selected.piiField ? `Pii Field: ${selected.piiField}` : ''}</h5>
                <h5>{selected.multiValued ? `Multi Valued: ${selected.multiValued}` : ''}</h5>
                <h5>{selected.analyzer ? `Analyzer: ${selected.analyzer}` : ''}</h5>
                <h5>{selected.properties ? `Properties: ${selected.properties.join(', ')}` : ''}</h5>
            </div>
        )
    }



    render() {
        return (
            <FocusView className='jumbotron'>
                <h3>Details</h3>
                {this.insertFocusInfo()}
            </FocusView>
        )
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