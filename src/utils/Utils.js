/*
 * @flow
 */

import Lattice from 'lattice';

// injected by Webpack.DefinePlugin
declare var __ENV_DEV__ :boolean;

export function getLatticeConfigBaseUrl() :string {

  // TODO: this probably doesn't belong here, also hardcoded strings == not great
  let baseUrl = 'localhost';
  if (!__ENV_DEV__) {
    baseUrl = window.location.host.startsWith('staging') ? 'staging' : 'production';
  }
  return baseUrl;
}

export function resetLatticeConfig() :void {

  Lattice.configure({
    baseUrl: getLatticeConfigBaseUrl(),
  });
}
