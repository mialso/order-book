import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducer';
import { middlewares } from './middleware';

export function configureStore(initState) {
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);

    const store = createStore(rootReducer, initState, composedEnhancers);
    return store;
}
