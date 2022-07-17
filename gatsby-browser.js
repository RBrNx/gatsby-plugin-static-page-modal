/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
// You can delete this file if you're not using it

import React from 'react';
import ChildRouter from './ChildRouter';

const wrapPageElement = ({ props, element }, { routes }) =>
  React.createElement(ChildRouter, { ...props, element, routes });

const shouldUpdateScroll = () => false;

export { wrapPageElement, shouldUpdateScroll };
