import { combineReducers } from 'redux';
import { configReducer } from '../model/config';
import { byPriceReducer } from '../model/byPrice';
import { orderReducer } from '../model/order';

export const rootReducer = combineReducers({
    config: configReducer,
    order: orderReducer,
    byPrice: byPriceReducer,
});
