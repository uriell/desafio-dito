import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import getTimeline from '../actions/TimelineActionCreators';
import { timelineSelector, timelineLoadingSelector } from '../selectors/timeline';

import TimelineComponent from '../components/Timeline';

const mapStateToProps = createStructuredSelector({
  timeline: timelineSelector,
  isLoading: timelineLoadingSelector,
});

const mapDispatchToProps = {
  getTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);