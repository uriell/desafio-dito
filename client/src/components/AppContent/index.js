import React from 'react';
import PropTypes from 'prop-types';

class AppComponent extends React.Component {
  componentWillMount() {
    // diremos ao servidor para obter os eventos estáticos, porém não precisamos deles para nada..
    this.props.fetchStaticEvents();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="Layout-LayoutContent">
        {children}
      </div>
    );
  }
}

AppComponent.propTypes = {
  children: PropTypes.node.isRequired,
  fetchStaticEvents: PropTypes.func.isRequired,
};

export default AppComponent;