/* eslint-disable @typescript-eslint/no-explicit-any */
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./Auth/reducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  //blacklist: ["cardStackReducer", "historyReducer"],
};

const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const middleWareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store: any = createStore(persistedReducer, middleWareEnhancer);
const persistor: any = persistStore(store);

export { store, persistor };
