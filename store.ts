import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import RootReducer from './src/Reducer/rootReducer';
import storage from 'redux-persist/lib/storage';
import buk from './utils/buk';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["AuthReducer", "UsersChannelsReducer"],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);
// let composeEnhancer = compose;
// const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store: any = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(createLogger({ logger: buk }))
    // other store enhancers if any
  )
);
const persistor = persistStore(store);

export { store, persistor };
