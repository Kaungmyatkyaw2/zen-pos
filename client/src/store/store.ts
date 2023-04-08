import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RootApi from "./service/Root.api";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import AuthSlice from "./slice/Auth.slice";
import UserSlice from "./slice/User.slice";
import CategorySlice from "./slice/Category.slice";
import OptionSlice from "./slice/Option.slice";
import CustomerOrder from "./slice/CustomerOrder";

const reducer = {
  [RootApi.reducerPath]: RootApi.reducer,
  auth: AuthSlice,
  user: UserSlice,
  category: CategorySlice,
  option: OptionSlice,
  customerOrder: CustomerOrder,
};
const combinedReducer = combineReducers<typeof reducer>(reducer);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth","customerOrder"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, combinedReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(RootApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
