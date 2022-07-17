/* eslint-disable import/no-dynamic-require */
import React from 'react';
// eslint-disable-next-line no-undef
const PageRenderer = require(__COMPONENT_BASE_PATH__).default;

const buildPageElement = (match, prevProps, props) => {
  const usePageRenderer = match && !prevProps;
  const pageElementProps = match && prevProps && props ? prevProps : props;
  const { component, page } = pageElementProps.pageResources || {};
  const { element: fallbackComponent } = props;

  if (usePageRenderer) {
    return React.createElement(PageRenderer, { match, key: match.route.path });
  }

  if (component) {
    return React.createElement(component, {
      ...pageElementProps,
      key: page.path,
    });
  }

  return fallbackComponent;
};

const buildModalElement = (match, pageResources, props) => {
  if (!match) return null;

  if (pageResources) {
    const { component } = pageResources;
    const { path } = pageResources.page;
    return React.createElement(component, { ...props, key: path });
  }

  return props.element;
};

export { buildPageElement, buildModalElement };
