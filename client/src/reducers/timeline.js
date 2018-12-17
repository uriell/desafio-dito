import {
  TIMELINE_LOAD_START,
  TIMELINE_LOAD_COMPLETE,
} from '../constants';

const initialState = {
  data: [],
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case TIMELINE_LOAD_START:
      return {
        data: [],
        loading: true,
      };
    case TIMELINE_LOAD_COMPLETE:
      return {
        data: payload.timeline,
        loading: false,
      };
    default:
      return state;
  }
}