import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/model/slice';
import { api } from '../shared/api';

export const reducer = combineReducers({
    offers: offersReducer,
    city: cityReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api,
        },
    }),
});
