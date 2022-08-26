import { AUTH_WS_URL, WS_URL } from './../../utils/constants';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers';
import { socketMiddleware } from '../middlewares/socket-middleware';
import { authSocketMiddleware } from '../middlewares/auth-socket-middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([socketMiddleware(WS_URL), authSocketMiddleware(AUTH_WS_URL)]),
  devTools: process.env.NODE_ENV !== 'production',
});
