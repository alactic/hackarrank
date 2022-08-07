import { createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers/rootReducer";
import _ from "lodash";

const initialState = {};

const middleWare = [thunk];

if (process.env.NODE_ENV === "development") {
  middleWare.push(logger);
}

export const saveState = (key, state) => {
  try {
    if (_.isEmpty(state)) {
      localStorage.removeItem(key);
      return;
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare, promise), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f));
const persistor = persistStore(store);

export { store, persistor };
