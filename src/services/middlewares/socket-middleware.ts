import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types';
import {
  setOrdersHistory,
  wsConnectClosed,
  wsConnectError,
  wsConnectSuccess,
} from '../reducers/feed-reducer';

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: AppDispatch) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === 'feed/wsConnect' && !socket) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === 'feed/wsClose') {
          socket.close();
        }

        socket.onopen = (event) => {
          dispatch(wsConnectSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsConnectError());
          socket = null;
        };

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          dispatch(setOrdersHistory(data));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectClosed());
          socket = null;
        };
      }
      next(action);
    };
  }) as Middleware;
};
