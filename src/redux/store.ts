// store.ts
import { ThunkMiddleware, thunk } from 'redux-thunk';
import { configureStore  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose your storage engine
import timeoutMiddleware from '../utilities/middleware/timeoutMiddleware';
import rootReducers from './reducers/rootReducers'; // Import your root reducer

const persistConfig = {
  key: 'root',
  storage,
  // Specify the reducers you want to persist
  whitelist: ['auth', 'path'], // In this example, we persist the 'user' reducer
};
const middleware: ThunkMiddleware[] = [thunk, timeoutMiddleware];

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducers);
// export const store = createStore(persistedReducer, applyMiddleware(thunk, timeoutMiddleware));
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(middleware),
});

export const persistor = persistStore(store);   