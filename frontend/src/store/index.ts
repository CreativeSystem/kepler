
import env from "~/utils/env";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
  createStore, Store, applyMiddleware, compose,
} from "redux";
import {
  persistReducer,
  persistStore,
  PersistConfig,
  createTransform,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";

import Encryptor from "@services/encryptor";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";
import { SessionState } from "./ducks/session/types";

export interface ApplicationState {
  session: SessionState;
}

const sagaMiddleware = createSagaMiddleware();
const encryptor = new Encryptor(env("PERSIST_KEY"));

interface EncryptState {
  encrypt: string;
}
const encryptTransform = createTransform(
  (state: EncryptState) => {
    const encrypt = encryptor.encrypt(state);
    return { encrypt };
  },
  ({ encrypt }: EncryptState) => {
    const decrypt = encryptor.decrypt(encrypt);
    return decrypt;
  },
);

const persistConfig: PersistConfig<any> = {
  key: "cfood",
  storage: localStorage,
  whitelist: ["session"],
  transforms: [encryptTransform],
};

const history = createBrowserHistory();

const reducers = rootReducer(history);

const persistedReducer = persistReducer(persistConfig, reducers);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor, history };
