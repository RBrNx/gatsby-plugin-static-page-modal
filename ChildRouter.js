/* eslint-disable import/no-dynamic-require */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { matchPath } from '@reach/router';
import { buildModalElement, buildPageElement } from './utils';

const ChildRouter = props => {
  const { pageResources, location, routes } = props;
  const [prevProps, setPrevProps] = useState(null);
  const [currentProps, setCurrentProps] = useState(null);

  const [match] = routes.map(route => matchPath(route, location.pathname)).filter(Boolean);

  if (location.pathname !== currentProps?.location?.pathname) {
    const oldProps = currentProps;

    setCurrentProps(props);
    setPrevProps(oldProps);

    return null;
  }

  const pageElement = buildPageElement(match, prevProps, props);
  const modalElement = buildModalElement(match, pageResources, props);

  return (
    <>
      {pageElement}
      {modalElement}
    </>
  );
};

export default ChildRouter;
