import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { userReducer, eventsReducer} from '../reducers';
import { routerReducer } from 'react-router-redux';

const configureStore = () => {

    const initialState = {
        user: {
          isUserLoggedIn: window.userLoggedIn,
          signup: {
              error: false
          },
          profile: null
        }
    };
    const loggerMiddleware = createLogger()

    const isProduction = process.env.NODE_ENV === 'production';
    let enchancer = {};

    if (isProduction) {
        enchancer = compose(
            applyMiddleware(thunkMiddleware)
        );
    } else {
        enchancer = compose(
            applyMiddleware(thunkMiddleware, loggerMiddleware),
        );
    }

    const combinedReducer = combineReducers({
        user: userReducer,
        events: eventsReducer,
        routing: routerReducer
    });

    return createStore(combinedReducer, initialState, enchancer)
};

export default configureStore;

