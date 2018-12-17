import { message } from 'antd';
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
import { get, post } from './RequestActionCreators';

export function clearEventKeys() {
  return {
    type: SEARCH_KEYS_COMPLETE,
    payload: { keys: [] },
  };
}

export function showAddEventModal() {
  return {
    type: SHOW_ADD_EVENT_MODAL,
  };
}

export function hideAddEventModal() {
  return {
    type: HIDE_ADD_EVENT_MODAL,
  };
}

export function addEvent(event) {
  return post('/events/new', { events: [event] }, {
    onStart: () => ({
      type: ADD_EVENT_SUBMIT_START,
    }),
    onComplete: ({ data }) => {
      const [firstEvent] = data;

      message.success(`O evento ${firstEvent.key} foi adicionado com sucesso.`);

      return {
        type: ADD_EVENT_SUBMIT_COMPLETE,
      };
    },
    onError: () => {
      message.error('Um erro ocorreu ao adicionar o evento.');

      return {
        type: ADD_EVENT_SUBMIT_COMPLETE,
      };
    },
  });
}

export function searchEventKeys(term) {
  return get('/events/keys', {
    qs: { search: term },
    onStart: () => ({
      type: SEARCH_KEYS_START,
    }),
    onComplete: ({ data }) => ({
      type: SEARCH_KEYS_COMPLETE,
      payload: { keys: data },
    }),
    onError: () => ({
      type: SEARCH_KEYS_COMPLETE,
      payload: { keys: [] },
    }),
  });
}

export function searchEvents(term) {
  return get('/events', {
    qs: { search: term },
    onStart: () => ({
      type: SEARCH_EVENTS_START,
    }),
    onComplete: ({ data }) => ({
      type: SEARCH_EVENTS_COMPLETE,
      payload: { events: data },
    }),
    onError: () => ({
      type: SEARCH_EVENTS_COMPLETE,
      payload: { events: [] },
    }),
  });
}

export function fetchStaticEvents() {
  // nothing else needs to be done with it.
  return get('/events/fetch');
}