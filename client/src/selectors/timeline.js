import { createSelector } from 'reselect';

const baseSelector = state => state.timeline;

export const timelineSelector = createSelector(
  baseSelector,
  timeline => timeline.data,
);

export const timelineLoadingSelector = createSelector(
  baseSelector,
  timeline => timeline.loading,
);