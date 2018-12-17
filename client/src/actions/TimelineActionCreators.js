import { get } from './RequestActionCreators';
import {
  TIMELINE_LOAD_START,
  TIMELINE_LOAD_COMPLETE,
} from '../constants';

export default function getTimeline() {
  return get('/events/timeline', {
    onStart: () => ({
      type: TIMELINE_LOAD_START,
    }),
    onComplete: ({ data }) => {
      const [timeline] = data;

      return {
        type: TIMELINE_LOAD_COMPLETE,
        payload: { timeline: timeline.timeline },
      };
    },
    onError: () => ({
      type: TIMELINE_LOAD_COMPLETE,
      payload: { timeline: [] },
    }),
  });
}