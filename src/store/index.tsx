/* eslint-disable @typescript-eslint/no-explicit-any */
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
//import { composeWithDevTools } from "remote-redux-devtools";
import { userReducer } from "./User/reducer";
import { themeReducer } from "./Theme/reducer";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createSelectorHook } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userReducer,
  themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector = createSelectorHook<RootState>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancers = composeWithDevTools({
//   realtime: true,
//   name: "TrendFrontend",
//   hostname: "localhost",
//   port: 8000, // the port your remotedev server is running at
// });

const middlewares = [thunk];
const middleWareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(persistedReducer, middleWareEnhancer);
// const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(thunk))
// ); //Macbook
const persistor = persistStore(store);
export { store, persistor };
