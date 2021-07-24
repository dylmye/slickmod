import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PersistConfig } from "redux-persist/es/types";

import accountReducer from "features/Accounts/slice";
import conversationsReducer from "features/ConversationList/slice";

const persistRootStoreConfig: PersistConfig<any> = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: ["accounts"],
};

const persistAccountStoreConfig: PersistConfig<any> = {
  key: "accounts",
  version: 1,
  storage: EncryptedStorage,
};

const rootReducer = persistReducer(
  persistRootStoreConfig,
  combineReducers({
    main: combineReducers({
      conversations: conversationsReducer,
    }),
    accounts: persistReducer(persistAccountStoreConfig, accountReducer),
  }),
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
