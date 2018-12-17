import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { showAddEventModal } from '../actions/EventActionCreators';
import AppHeader from '../components/AppHeader';

const mapDispatchToProps = {
  onAddEventClick: showAddEventModal,
};

export default connect(createStructuredSelector({}), mapDispatchToProps)(AppHeader);