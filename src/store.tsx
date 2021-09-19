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
  middleware: getDefaultMiddleware => {
    let middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const reduxFlipperMiddleware = require("redux-flipper").default;
      middleware = middleware.concat(reduxFlipperMiddleware());
    }

    return middleware;
  },
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
