/*
 * @flow
 */

import { fork } from 'redux-saga/effects';

import * as AppSagas from '../../containers/app/sagas/AppSagas';

export default function* sagas() :Generator<*, *, *> {

  yield [

    // AppSagas
    fork(AppSagas.loadAppWatcher),
  ];
}
