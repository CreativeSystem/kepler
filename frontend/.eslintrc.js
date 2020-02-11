module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "react-app",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react",
    "import",
    "jsx-a11y",
    "eslint-plugin-import-helpers",
    "eslint-import-resolver-babel-plugin-root-import"
  ],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"]
      }
    ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/^services/",
          "/^store/",
          "/^pages/",
          "/^components/",
          "/^assets/",
          ["parent", "sibling", "index"]
        ],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {},
      "babel-plugin-root-import": {
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
    }
  }
};
