import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contactsSlice from './contacts/contactsSlice';
import filterSlice from './filter/filterSlice';

const rootReducer = combineReducers({
  contacts: contactsSlice,
  filter: filterSlice,
});

const persistConfig = {
  key: 'my-contacts',
  storage,
  blacklist: ['filter'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
