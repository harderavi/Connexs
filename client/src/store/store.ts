import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from "./slices/themeSlice"
import authReducer from './slices/authSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';


const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authReducer
  });

  const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persistedReducer,

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),

})
 
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
