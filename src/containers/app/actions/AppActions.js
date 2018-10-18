/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';

const LOAD_APP :'LOAD_APP' = 'LOAD_APP';
const loadApp :RequestSequence = newRequestSequence(LOAD_APP);
const PROPERTY_TYPE_SELECTED :'PROPERTY_TYPE_SELECTED' = 'PROPERTY_TYPE_SELECTED';
const propertyTypeSelected = newRequestSequence(PROPERTY_TYPE_SELECTED); 
const ENTITY_TYPE_SELECTED :'ENTITY_TYPE_SELECTED' = 'ENTITY_TYPE_SELECTED';
const entityTypeSelected = newRequestSequence(ENTITY_TYPE_SELECTED); 

export {
  LOAD_APP,
  loadApp,
  PROPERTY_TYPE_SELECTED,
  propertyTypeSelected,
  ENTITY_TYPE_SELECTED,
  entityTypeSelected
};
