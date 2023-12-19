import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { thunk } from 'redux-thunk';
import accountSlice from '../pages/accountSlice';

const reducers = combineReducers({
    user: userSlice,
    account: accountSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);



export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});