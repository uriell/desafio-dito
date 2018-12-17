import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { eventKeysSelector, eventKeysLoadingSelector } from '../selectors/events';
import { searchEventKeys, searchEvents, clearEventKeys } from '../actions/EventActionCreators';

import SearchComponent from '../components/Events/Search';

const mapStateToProps = createStructuredSelector({
  isLoading: eventKeysLoadingSelector,
  keys: eventKeysSelector,
});

const mapDispatchToProps = {
  onClear: clearEventKeys,
  onSubmit: searchEvents,
  onSearch: searchEventKeys,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);