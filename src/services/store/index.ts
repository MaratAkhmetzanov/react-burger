import { wsActions } from './../reducers/feed-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers';
import { socketMiddleware } from '../middlewares/socket-middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([socketMiddleware(wsActions)]),
  devTools: process.env.NODE_ENV !== 'production',
});
