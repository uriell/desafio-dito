import { createSelector } from 'reselect';

const baseSelector = state => state.events;

const eventDataSelector = createSelector(
  baseSelector,
  events => events.data,
);

const eventLoadingStatusSelector = createSelector(
  baseSelector,
  events => events.statusLoading,
);

const addEventSelector = createSelector(
  baseSelector,
  events => events.addEvent,
);

export const eventKeysSelector = createSelector(
  eventDataSelector,
  data => data.keys,
);

export const eventsSelector = createSelector(
  eventDataSelector,
  data => data.events,
);

export const eventKeysLoadingSelector = createSelector(
  eventLoadingStatusSelector,
  status => status.keys,
);

export const eventsLoadingSelector = createSelector(
  eventLoadingStatusSelector,
  status => status.events,
);

export const addEventModalVisibleSelector = createSelector(
  addEventSelector,
  addEvent => addEvent.modalVisible,
);

export const addEventSubmittingSelector = createSelector(
  addEventSelector,
  addEvent => addEvent.submitting,
);