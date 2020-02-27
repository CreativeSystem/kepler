import React from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "styled-components";
import { store, persistor } from "./store";

import Routes from "./routes";

import { light } from "./styles/theme";
import GlobalStyle from "./styles";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "semantic-ui-css/semantic.min.css";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
