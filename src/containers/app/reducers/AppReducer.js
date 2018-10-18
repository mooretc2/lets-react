/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import isNumber from 'lodash/isNumber';

import { EntityDataModelApiActionFactory } from 'lattice-sagas';
const { getEntityDataModel } = EntityDataModelApiActionFactory;

import { loadApp, propertyTypeSelected, entityTypeSelected } from '../actions/AppActions';

const INITIAL_STATE: Map<*, *> = fromJS({
  actions: {
    loadApp: Map()
  },
  errors: {
    loadApp: Map()
  },
  isLoadingApp: false,
  gettingEDM: false,
  namespaces: List()
});

export default function appReducer(state: Map<*, *> = INITIAL_STATE, action: Object) {

  switch (action.type) {

    case loadApp.case(action.type): {
      return loadApp.reducer(state, action, {
        REQUEST: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .set('isLoadingApp', true)
            .setIn(['actions', 'loadApp', seqAction.id], fromJS(seqAction));
        },
        SUCCESS: () => {
          console.log(action)
          const seqAction: SequenceAction = (action: any);
          if (!state.hasIn(['actions', 'loadApp', seqAction.id])) {
            return state;
          }

          const { value } = seqAction;
          if (value === null || value === undefined) {
            return state;
          }

          // TODO: do something with "value"
          return state;
        },
        FAILURE: () => {

          const seqAction: SequenceAction = (action: any);
          const error = {};

          /*
           * value is expected to be an error object. for lattice-sagas / lattice-js, the error object is expected
           * to be the Axios error object. for more info:
           *   https://github.com/axios/axios#handling-errors
           */
          const { value: axiosError } = seqAction;
          if (axiosError && axiosError.response && isNumber(axiosError.response.status)) {
            // for now, we only care about the HTTP status code. we can get more fancy later on.
            error.status = axiosError.response.status;
          }

          // TODO: there's probably a significantly better way of handling errors
          return state.setIn(['errors', 'loadApp'], fromJS(error));
        },
        FINALLY: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .set('isLoadingApp', false)
            .deleteIn(['actions', 'loadApp', seqAction.id]);
        }
      });
    }
    case getEntityDataModel.case(action.type): {
      return getEntityDataModel.reducer(state, action, {
        REQUEST: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .set('gettingEDM', true)
            .setIn(['actions', 'getEntityDataModel', seqAction.id], fromJS(seqAction));
        },
        SUCCESS: () => {
          const seqAction: SequenceAction = (action: any);
          if (!state.hasIn(['actions', 'getEntityDataModel', seqAction.id])) {
            return state;
          }
          const { value } = seqAction;
          if (value === null || value === undefined) {
            return state;
          }

          let collectedEntityTypes = {},
            collectedPropertyTypes = {};
          value.entityTypes.map((entityType) => {
            if (collectedEntityTypes[entityType.type.namespace]) {
              collectedEntityTypes[entityType.type.namespace].push(entityType)
            } else {
              collectedEntityTypes[entityType.type.namespace] = [entityType]
            }
          });
          value.propertyTypes.map((propertyType) => {
            if (collectedPropertyTypes[propertyType.type.namespace]) {
              collectedPropertyTypes[propertyType.type.namespace].push(propertyType)
            } else {
              collectedPropertyTypes[propertyType.type.namespace] = [propertyType]
            }
          });

          let namespaces = value.namespaces.sort((ns1, ns2) => {
            let et1Length = collectedEntityTypes[ns1] ? collectedEntityTypes[ns1].length : 0;
            let et2Length = collectedEntityTypes[ns2] ? collectedEntityTypes[ns2].length : 0;
            return et2Length - et1Length;
          })

          // TODO: do something with "value"
          return state
            .set('namespaces', namespaces)
            .set('entityTypes', collectedEntityTypes)
            .set('rawEntityTypes', value.entityTypes)
            .set('associationTypes', value.associationTypes)
            .set('propertyTypes', collectedPropertyTypes)
            .set('rawPropertyTypes', value.propertyTypes);
        },
        FAILURE: () => {

          const seqAction: SequenceAction = (action: any);
          const error = {};

          /*
           * value is expected to be an error object. for lattice-sagas / lattice-js, the error object is expected
           * to be the Axios error object. for more info:
           *   https://github.com/axios/axios#handling-errors
           */
          const { value: axiosError } = seqAction;
          if (axiosError && axiosError.response && isNumber(axiosError.response.status)) {
            // for now, we only care about the HTTP status code. we can get more fancy later on.
            error.status = axiosError.response.status;
          }

          // TODO: there's probably a significantly better way of handling errors
          return state.setIn(['errors', 'getEntityDataModel'], fromJS(error));
        },
        FINALLY: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .set('gettingEDM', false)
            .deleteIn(['actions', 'getEntityDataModel', seqAction.id]);
        }
      })
    }
    case propertyTypeSelected.case(action.type): {
      return propertyTypeSelected.reducer(state, action, {
        REQUEST: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .setIn(['actions', 'typeSelected', seqAction.id], fromJS(seqAction));
        },
        SUCCESS: () => {
          const seqAction: SequenceAction = (action: any);
          
          if (!state.hasIn(['actions', 'typeSelected', seqAction.id])) {
            return state;
          }

          const { value } = seqAction;
          if (value === null || value === undefined) {
            return state;
          }

          // TODO: do something with "value"
          return state
            .set('selectedType', value)
            .set('selectedTypeType', 'property');
        },
        FAILURE: () => {

          const seqAction: SequenceAction = (action: any);
          const error = {};

          /*
           * value is expected to be an error object. for lattice-sagas / lattice-js, the error object is expected
           * to be the Axios error object. for more info:
           *   https://github.com/axios/axios#handling-errors
           */
          const { value: axiosError } = seqAction;
          if (axiosError && axiosError.response && isNumber(axiosError.response.status)) {
            // for now, we only care about the HTTP status code. we can get more fancy later on.
            error.status = axiosError.response.status;
          }

          // TODO: there's probably a significantly better way of handling errors
          return state.setIn(['errors', 'typeSelected'], fromJS(error));
        },
        FINALLY: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .deleteIn(['actions', 'typeSelected', seqAction.id]);
        }
      });
    }
    case entityTypeSelected.case(action.type): {
      return entityTypeSelected.reducer(state, action, {
        REQUEST: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .setIn(['actions', 'typeSelected', seqAction.id], fromJS(seqAction));
        },
        SUCCESS: () => {
          const seqAction: SequenceAction = (action: any);
          
          if (!state.hasIn(['actions', 'typeSelected', seqAction.id])) {
            return state;
          }

          const { value } = seqAction;
          if (value === null || value === undefined) {
            return state;
          }

          // TODO: do something with "value"
          return state
            .set('selectedType', value)
            .set('selectedTypeType', 'entity');
        },
        FAILURE: () => {

          const seqAction: SequenceAction = (action: any);
          const error = {};

          /*
           * value is expected to be an error object. for lattice-sagas / lattice-js, the error object is expected
           * to be the Axios error object. for more info:
           *   https://github.com/axios/axios#handling-errors
           */
          const { value: axiosError } = seqAction;
          if (axiosError && axiosError.response && isNumber(axiosError.response.status)) {
            // for now, we only care about the HTTP status code. we can get more fancy later on.
            error.status = axiosError.response.status;
          }

          // TODO: there's probably a significantly better way of handling errors
          return state.setIn(['errors', 'typeSelected'], fromJS(error));
        },
        FINALLY: () => {
          const seqAction: SequenceAction = (action: any);
          return state
            .deleteIn(['actions', 'typeSelected', seqAction.id]);
        }
      });
    }
    default:
      return state;
  }
}
