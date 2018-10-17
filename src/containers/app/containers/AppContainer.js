/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AppHeaderContainer from './AppHeaderContainer';
import Spinner from '../../../components/spinner/Spinner';
import * as Routes from '../../../core/router/Routes';
import { loadApp } from '../actions/AppActions';
import { APP_NAME } from '../../../utils/Constants';
import NamespacesContainer from './NamespacesContainer';
import { EntityDataModelApiActionFactory } from 'lattice-sagas';
const { getEntityDataModel } = EntityDataModelApiActionFactory;
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_WIDTH,
  APP_CONTENT_PADDING
} from '../../../core/style/Sizes';

// TODO: this should come from lattice-ui-kit, maybe after the next release. current version v0.1.1
const APP_CONTENT_BG: string = '#f8f8fb';

const AppContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  min-width: ${APP_CONTAINER_WIDTH}px;
  padding: 0;
`;

const AppContentOuterWrapper = styled.main`
  background-color: ${APP_CONTENT_BG};
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  position: relative;
`;

const AppContentInnerWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  padding: ${APP_CONTENT_PADDING}px;
  position: relative;
`;

type Props = {
  actions: {
    loadApp: RequestSequence,
    getEntityDataModel: RequestSequence
  };
  isLoadingApp: boolean,
  gettingEDM: boolean
};

class AppContainer extends Component<Props> {

  componentDidMount() {

    const { actions } = this.props;
    actions.loadApp(APP_NAME);
    actions.getEntityDataModel();
  }

  renderAppContent = () => {

    const { isLoadingApp, gettingEDM } = this.props;
    if (isLoadingApp) {
      return (
        <Spinner />
      );
    }

    return (
      <Switch>
        <Route exact strict path={Routes.HOME} />
        <Route exact path={Routes.NAMESPACES} component={NamespacesContainer} />
        <Route path="/tab2" render={() => null} />
        <Redirect to={Routes.HOME} />
      </Switch>
    );
  }

  render() {

    return (
      <AppContainerWrapper>
        <AppHeaderContainer />
        <AppContentOuterWrapper>
          <AppContentInnerWrapper>
            {this.renderAppContent()}
          </AppContentInnerWrapper>
        </AppContentOuterWrapper>
      </AppContainerWrapper>
    );
  }
}

function mapStateToProps(state: Map<*, *>): Object {

  return {
    isLoadingApp: state.getIn(['app', 'isLoadingApp'], false),
    gettingEDM: state.getIn(['app', 'gettingEDM'], false)
  };
}

function mapDispatchToProps(dispatch: Function): Object {

  return {
    actions: bindActionCreators({ loadApp, getEntityDataModel }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
