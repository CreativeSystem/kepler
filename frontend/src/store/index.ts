import { createStore, Store, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  persistReducer,
  persistStore,
  PersistConfig,
  createTransform
} from "redux-persist";

import { SessionState } from "./ducks/session/types";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";
import localStorage from "redux-persist/es/storage";

import Encryptor from "@services/encryptor";
import env from "~/util/env";

export interface ApplicationState {
  session: SessionState;
}

const sagaMiddleware = createSagaMiddleware();
const encryptor = new Encryptor(env("PERSIST_KEY"));

interface encryptState {
  encrypt: string;
}
const encryptTransform = createTransform(
  (state: encryptState) => {
    let encrypt = encryptor.encrypt(state);
    return { encrypt };
  },
  ({ encrypt }: encryptState) => {
    let decrypt = encryptor.decrypt(encrypt);
    return decrypt;
  }
);

const persistConfig: PersistConfig<any> = {
  key: "cfood",
  storage: localStorage,
  whitelist: ["session"],
  transforms: [encryptTransform]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
