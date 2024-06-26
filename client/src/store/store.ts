import {combineReducers, configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistStore, persistReducer,PersistConfig} from "redux-persist"
import themeReducer from './slices/themeSlice'

const rootReducer = combineReducers ({
    theme: themeReducer,
})

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key:"root",
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer:persistedReducer
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch