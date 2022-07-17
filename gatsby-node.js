// eslint-disable-next-line import/no-extraneous-dependencies
const { DefinePlugin } = require('webpack');

exports.onCreateWebpackConfig = ({ actions }, { pageRendererPath }) => {
  actions.setWebpackConfig({
    plugins: [
      new DefinePlugin({
        __COMPONENT_BASE_PATH__: JSON.stringify(pageRendererPath),
      }),
    ],
  });
};
