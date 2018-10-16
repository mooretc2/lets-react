/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../../core/router/Routes';

const NAV_LINK_ACTIVE_CLASSNAME :string = 'nav-link-active';

const NavigationContentWrapper = styled.nav`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  margin-left: 30px;
`;

const NavLinkWrapper = styled(NavLink).attrs({
  activeClassName: NAV_LINK_ACTIVE_CLASSNAME
})`
  align-items: center;
  border-bottom: 3px solid transparent;
  display: flex;
  font-size: 12px;
  letter-spacing: 0;
  margin-right: 30px;
  outline: none;
  padding: 13px 2px 10px 2px;
  text-align: left;
  text-decoration: none;

  &:focus {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    outline: none;
    text-decoration: none;
  }

  &.${NAV_LINK_ACTIVE_CLASSNAME} {
    border-bottom: 3px solid;
  }
`;

type Props = {};

class AppNavigationContainer extends Component<Props> {

  render() {

    return (
      <NavigationContentWrapper>
        <NavLinkWrapper to={Routes.HOME}>
          Home
        </NavLinkWrapper>
        <NavLinkWrapper to={Routes.ALLTEXT}>
          Text
        </NavLinkWrapper>
        <NavLinkWrapper to="/tab2">
          Tab 2
        </NavLinkWrapper>
      </NavigationContentWrapper>
    );
  }
}

export default withRouter(AppNavigationContainer);
