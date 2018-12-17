import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'antd';

import { addEvent } from '../actions/EventActionCreators';

import AddEventFormComponent from '../components/AddEventForm';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  onSubmit: addEvent,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
)(AddEventFormComponent);