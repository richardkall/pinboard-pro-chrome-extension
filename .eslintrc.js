const config = require('@richardkall/web-scripts/config/eslint-config');

module.exports = {
  ...config,
  env: {
    ...config.env,
    browser: true,
  },
  globals: {
    ...config.globals,
    chrome: false,
    Pinboard: false,
  },
};
