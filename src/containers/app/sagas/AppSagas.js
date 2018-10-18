/*
 * @flow
 */

/* eslint-disable no-use-before-define */

import { put, takeEvery } from 'redux-saga/effects';

import Logger from '../../../utils/Logger';
import { ERR_ACTION_VALUE_NOT_DEFINED } from '../../../utils/Errors';
import {
  LOAD_APP,
  loadApp,
  PROPERTY_TYPE_SELECTED,
  propertyTypeSelected,
  ENTITY_TYPE_SELECTED,
  entityTypeSelected
} from '../actions/AppActions';

const LOG = new Logger('AppSagas');

/*
 * loadApp()
 */

function* loadAppWatcher() :Generator<*, *, *> {

  yield takeEvery(LOAD_APP, loadAppWorker);
}

function* loadAppWorker(action :SequenceAction) :Generator<*, *, *> {

  const { id, value } = action;
  if (value === null || value === undefined) {
    yield put(loadApp.failure(id, ERR_ACTION_VALUE_NOT_DEFINED));
    return;
  }

  try {
    yield put(loadApp.request(action.id));
    yield put(loadApp.success(action.id));
  }
  catch (error) {
    LOG.error('caught exception in loadAppWorker()', error);
    yield put(loadApp.failure(action.id, error));
  }
  finally {
    yield put(loadApp.finally(action.id));
  }
}

function* propertyTypeSelectedWatcher() :Generator<*,*,*> {
  yield takeEvery(PROPERTY_TYPE_SELECTED, propertyTypeSelectedWorker);
}

function* propertyTypeSelectedWorker(action :SequenceAction) :Generator<*,*,*> {
  const { id, value } = action;
  if (value === null || value === undefined) {
    yield put(propertyTypeSelected.failure(id, ERR_ACTION_VALUE_NOT_DEFINED));
    return;
  }

  try {
    yield put(propertyTypeSelected.request(action.id));
    yield put(propertyTypeSelected.success(action.id, value));
  }
  catch (error) {
    LOG.error('caught exception in propertyTypeSelectedWorker()', error);
    yield put(propertyTypeSelected.failure(action.id, error));
  }
  finally {
    yield put(propertyTypeSelected.finally(action.id));
  }
}

function* entityTypeSelectedWatcher() :Generator<*,*,*> {
  yield takeEvery(ENTITY_TYPE_SELECTED, entityTypeSelectedWorker);
}

function* entityTypeSelectedWorker(action :SequenceAction) :Generator<*,*,*> {
  const { id, value } = action;
  if (value === null || value === undefined) {
    yield put(entityTypeSelected.failure(id, ERR_ACTION_VALUE_NOT_DEFINED));
    return;
  }

  try {
    yield put(entityTypeSelected.request(action.id));
    yield put(entityTypeSelected.success(action.id, value));
  }
  catch (error) {
    LOG.error('caught exception in entityTypeSelectedWorker()', error);
    yield put(entityTypeSelected.failure(action.id, error));
  }
  finally {
    yield put(entityTypeSelected.finally(action.id));
  }
}

export {
  loadAppWatcher,
  loadAppWorker,
  propertyTypeSelectedWatcher,
  propertyTypeSelectedWorker,
  entityTypeSelectedWatcher,
  entityTypeSelectedWorker
};
