import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Events from '../Events';
import Timeline from '../../containers/Timeline';
import AppHeader from '../../containers/AppHeader';
import AppContent from '../../containers/AppContent';
import './index.css';

const { Header, Footer, Content } = Layout;

export default () => (
  <Layout className="Layout">
    <Header className="Layout-LayoutHeader">
      <AppHeader />
    </Header>

    <Content className="Layout-LayoutContentContainer">
      <AppContent>
        <Switch>
          <Route exact path="/" component={Events} />
          <Route exact path="/timeline" component={Timeline} />
        </Switch>
      </AppContent>
    </Content>

    <Footer className="Layout-LayoutFooter">
      Made with <span role="img" aria-label="Heart">❤️</span> by Uriell Viana for Dito
    </Footer>
  </Layout>
);