import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types';
import {
  setOrdersHistory,
  wsConnectClosed,
  wsConnectError,
  wsConnectSuccess,
} from '../reducers/feed-reducer';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === 'feed/wsConnect') {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        if (type === 'feed/wsClose') {
          socket.close();
        }

        socket.onopen = (event) => {
          console.log('Open', event);
          dispatch(wsConnectSuccess());
        };

        socket.onerror = (event) => {
          console.log('Error', event);
          dispatch(wsConnectError());
        };

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          dispatch(setOrdersHistory(data));
        };

        socket.onclose = (event) => {
          console.log('Close', event);
          dispatch(wsConnectClosed());
        };
      }

      next(action);
    };
  }) as Middleware;
};
