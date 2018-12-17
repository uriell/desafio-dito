import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import requestMiddleware from './requestMiddleware';

export default function createFinalStore(initialState = {}) {
  const middlewares = [thunk, requestMiddleware];

  const store = createStore(
    combineReducers(reducers),
    initialState,
    // persistSettings later
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
