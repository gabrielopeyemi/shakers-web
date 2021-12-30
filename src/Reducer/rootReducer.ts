import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer/tokenReducer';

const RootReducer = combineReducers({
  tokenReducer,
});

export default RootReducer;
