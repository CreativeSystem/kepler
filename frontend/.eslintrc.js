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
  plugins: ["react","import", "jsx-a11y", "eslint-plugin-import-helpers"],
  rules: {
    "import/export": "off",
    "import/prefer-default-export": "off",
    "import/named": "off",
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies":"off",
    "import/no-duplicates":"off",
    "import/order":"off",
    "import/no-self-import": "off",
    "import/no-cycle":"off",
    "import/no-named-as-default":"off",
    "import/no-named-as-default-member":"off",
    "import/no-useless-path-segments":"off",
    "@typescript-eslint/interface-name-prefix":"off",
    "import/no-cycle":"off",
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
          "/^styled/",
          ["parent", "sibling", "index"]
        ],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ],
    quotes: ["error", "double"],
    "@typescript-eslint/no-var-requires": "off"
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        "alwaysTryTypes": true
      },
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
