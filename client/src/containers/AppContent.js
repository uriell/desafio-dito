import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchStaticEvents } from '../actions/EventActionCreators';
import AppContentComponent from '../components/AppContent';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = { fetchStaticEvents };

export default connect(mapStateToProps, mapDispatchToProps)(AppContentComponent);