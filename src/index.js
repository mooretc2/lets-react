/*
 * @flow
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { normalize } from 'polished';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { injectGlobal } from 'styled-components';

import AppContainer from './containers/app/containers/AppContainer';
import initializeReduxStore from './core/redux/ReduxStore';
import initializeRouterHistory from './core/router/RouterHistory';
import * as Routes from './core/router/Routes';
import { getLatticeConfigBaseUrl } from './utils/Utils';

/* eslint-disable */
// TODO: move into core/styles
injectGlobal`${normalize()}`;

injectGlobal`
  html,
  body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  #app {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
/* eslint-enable */

const routerHistory = initializeRouterHistory();
const reduxStore = initializeReduxStore(routerHistory);

const APP_ROOT_NODE = document.getElementById('app');
if (APP_ROOT_NODE) {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <ConnectedRouter history={routerHistory}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    APP_ROOT_NODE
  );
}
