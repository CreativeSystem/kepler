const { override, addBabelPlugin } = require("customize-cra");

module.exports = override(
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      paths: [
        {
          rootPathSuffix: "src",
          rootPathPrefix: "~"
        },
        {
          rootPathSuffix: "src/store/ducks",
          rootPathPrefix: "@ducks"
        },
        {
          rootPathSuffix: "src/services",
          rootPathPrefix: "@services"
        },
        {
          rootPathSuffix: "src/assets",
          rootPathPrefix: "@assets"
        },
        {
          rootPathSuffix: "src/pages",
          rootPathPrefix: "@pages"
        },
        {
          rootPathSuffix: "src/store",
          rootPathPrefix: "@store"
        },
        {
          rootPathSuffix: "src/components",
          rootPathPrefix: "@components"
        }
      ]
    }
  ])
);
