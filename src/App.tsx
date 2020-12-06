import React from "react";
import "./App.css";
import "./styles/common.scss";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store, persistor } from "./store";
import Login from "./pages/Login/Login";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Login />
      </PersistGate>
    </Provider>
  );
}
