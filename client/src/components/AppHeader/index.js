import React from 'react';
import { Menu, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AddEventModal from '../../containers/AddEventModal';
import './index.css';

class AppHeader extends React.Component {
  state = {
    selectedKey: '1',
  }

  onChange = (e) => {
    this.setState({
      selectedKey: e.key,
    });
  }

  render() {
    const { selectedKey } = this.state;
    const { onAddEventClick } = this.props;

    return (
      <div className="AppHeader">
        <div className="AppHeader-AppHeaderLogo">
          <img src="/static/logo.png" alt="Logo" />
        </div>
        <Menu
          className="AppHeader-AppHeaderMenu"
          theme="dark"
          mode="horizontal"
          onSelect={this.onChange}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="1">
            <Link to="/">Eventos</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/timeline">Timeline</Link>
          </Menu.Item>
        </Menu>
        <Button
          type="primary"
          shape="circle"
          className="AppHeader-AppHeaderButton"
          onClick={onAddEventClick}
        >
          <Icon type="plus" />
        </Button>
        <AddEventModal />
      </div>
    );
  }
}

AppHeader.propTypes = {
  onAddEventClick: PropTypes.func.isRequired,
};

export default AppHeader;