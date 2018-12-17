import { REQUEST_START } from '../constants';
import { qsStringify } from '../utils';

const API_HOSTNAME = 'http://localhost:3001';

export default function middleware({ dispatch }) {
  return next => (action) => {
    if (action.type !== REQUEST_START) {
      return next(action);
    }

    const { payload, meta } = action;
    const options = {
      method: payload.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (options.method !== 'get') {
      options.body = JSON.stringify(payload.data);
    }

    if (meta.onStart) {
      dispatch(meta.onStart());
    }

    return fetch(API_HOSTNAME + payload.url + qsStringify(payload.qs), options)
      .then(res => res.json())
      .then((res) => {
        if (meta.onComplete) {
          dispatch(meta.onComplete(res));
        }

        return res;
      })
      .catch((err) => {
        if (meta.onError) {
          dispatch(meta.onError());
        }

        throw err;
      });
  };
}