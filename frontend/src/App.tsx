import React from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import Routes from "./routes";
import { store, persistor } from "./store";
import GlobalStyle from "./styles";
import { light, ITheme } from "./styles/themes";

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
