import {
  SEARCH_KEYS_START,
  SEARCH_EVENTS_START,
  SEARCH_KEYS_COMPLETE,
  SEARCH_EVENTS_COMPLETE,
  SHOW_ADD_EVENT_MODAL,
  HIDE_ADD_EVENT_MODAL,
  ADD_EVENT_SUBMIT_START,
  ADD_EVENT_SUBMIT_COMPLETE,
} from '../constants';

const initialState = {
  addEvent: {
    submitting: false,
    modalVisible: false,
  },
  data: {
    keys: [],
    events: [],
  },
  statusLoading: {
    keys: false,
    events: false,
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_KEYS_START:
      return {
        ...state,
        data: {
          ...state.data,
          keys: [],
        },
        statusLoading: {
          ...state.statusLoading,
          keys: true,
        }
      };
    case SEARCH_EVENTS_START:
      return {
        ...state,
        data: {
          ...state.data,
          events: [],
        },
        statusLoading: {
          ...state.statusLoading,
          events: true,
        }
      };
    case SEARCH_KEYS_COMPLETE:
      return {
        ...state,
        data: {
          ...state.data,
          keys: payload.keys,
        },
        statusLoading: {
          ...state.statusLoading,
          keys: false,
        }
      };
    case SEARCH_EVENTS_COMPLETE:
      return {
        ...state,
        data: {
          ...state.data,
          events: payload.events,
        },
        statusLoading: {
          ...state.statusLoading,
          events: false,
        }
      };
    case SHOW_ADD_EVENT_MODAL:
      return {
        ...state,
        addEvent: {
          ...state.addEvent,
          modalVisible: true,
        },
      };
    case HIDE_ADD_EVENT_MODAL:
      return {
        ...state,
        addEvent: {
          ...state.addEvent,
          modalVisible: false,
        },
      };
    case ADD_EVENT_SUBMIT_START:
      return {
        ...state,
        addEvent: {
          ...state.addEvent,
          submitting: true,
        },
      };
    case ADD_EVENT_SUBMIT_COMPLETE:
      return {
        ...state,
        addEvent: {
          ...state.addEvent,
          submitting: false,
        },
      };
    default:
      return state;
  }
}