import { combineReducers } from 'redux';
import cart from './cart';
import country from './country';

const rootReducer = combineReducers({ cart, country });
export default rootReducer;
