import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { eventsSelector, eventsLoadingSelector } from '../selectors/events';

import TableComponent from '../components/Events/Table';

const mapStateToProps = createStructuredSelector({
  events: eventsSelector,
  isLoading: eventsLoadingSelector,
});

export default connect(mapStateToProps)(TableComponent);