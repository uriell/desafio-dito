import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { hideAddEventModal } from '../actions/EventActionCreators';
import { addEventSubmittingSelector, addEventModalVisibleSelector } from '../selectors/events';

import AddEventModalComponent from '../components/AddEventModal';

const mapStateToProps = createStructuredSelector({
  visible: addEventModalVisibleSelector,
  submitting: addEventSubmittingSelector,
});

const mapDispatchToProps = {
  onClose: hideAddEventModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventModalComponent);