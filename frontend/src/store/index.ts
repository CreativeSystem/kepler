
import env from "~/utils/env";
import { createStore, Store, applyMiddleware } from "redux";
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
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
