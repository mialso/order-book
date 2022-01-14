import { combineReducers } from 'redux';
import { controlReducer } from '../model/control/reducer';
import { CONTROL_KEY } from '../model/control/constant';
import { byPriceReducer } from '../model/byPrice';
import { orderReducer } from '../model/order';

export const rootReducer = combineReducers({
    [CONTROL_KEY]: controlReducer,
    order: orderReducer,
    byPrice: byPriceReducer,
});
