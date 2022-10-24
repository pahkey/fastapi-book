import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import pageReducer from './pageSlice'

const reducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
