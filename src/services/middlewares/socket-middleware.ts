import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types';
import {
  TWsActions,
} from '../reducers/feed-reducer';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: AppDispatch) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.wsConnect.type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === wsActions.wsClose.type) {
          socket.close(1000);
        }

        socket.onopen = (event) => {
          dispatch(wsActions.wsConnectSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsActions.wsConnectError());
          socket = null;
        };

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          dispatch(wsActions.setOrdersHistory(data));
        };

        socket.onclose = (event) => {
          dispatch(wsActions.wsConnectClosed());
          socket = null;
        };
      }
      next(action);
    };
  }) as Middleware;
};
