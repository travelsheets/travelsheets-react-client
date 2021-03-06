import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];

const middleware = [
    thunk,
    routerMiddleware(history)
];

if(process.env.NODE_ENV === 'development') {
    if(typeof window.devToolExtension === 'function') {
        enhancers.push(window.devToolExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers
);

export default store;