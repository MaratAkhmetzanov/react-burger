import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/cookie';
import { AppDispatch, RootState } from '../../utils/types';
import { setProfileOrders, wsProfileConnectSuccess } from '../reducers/profile-reducer';

export const authSocketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: AppDispatch) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === 'profile/wsProfileConnect') {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`);
      }

      if (socket) {
        if (type === 'profile/wsProfileClose') {
        }

        socket.onopen = (event) => {
          dispatch(wsProfileConnectSuccess());
        };

        socket.onerror = (event) => {
        };

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          dispatch(setProfileOrders(data));
        };

        socket.onclose = (event) => {
        };
      }
      next(action);
    };
  }) as Middleware;
};
