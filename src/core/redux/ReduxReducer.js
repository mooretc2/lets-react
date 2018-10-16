/*
 * @flow
 */

import { combineReducers } from 'redux-immutable';

import appReducer from '../../containers/app/reducers/AppReducer';

export default function reduxReducer() {

  return combineReducers({
    app: appReducer
  });
}
