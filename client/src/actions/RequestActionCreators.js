import { REQUEST_START } from '../constants';

function request(method, url, opts = {}) {
  const {
    onStart,
    onComplete,
    onError,
    ...requestOpts
  } = opts;

  return {
    type: REQUEST_START,
    payload: {
      ...requestOpts,
      method,
      url,
    },
    meta: {
      onStart,
      onComplete,
      onError,
    },
  };
}

export const get = (url, opts) =>
  request('get', url, opts);

export const post = (url, data, opts = {}) =>
  request('post', url, { data, ...opts });