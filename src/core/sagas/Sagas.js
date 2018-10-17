/*
 * @flow
 */

import { fork } from 'redux-saga/effects';

import * as AppSagas from '../../containers/app/sagas/AppSagas';
import { EntityDataModelApiSagas } from 'lattice-sagas';

export default function* sagas() :Generator<*, *, *> {

  yield [
    fork(EntityDataModelApiSagas.getEntityDataModelWatcher),
    // AppSagas
    fork(AppSagas.loadAppWatcher)
  ];
}
