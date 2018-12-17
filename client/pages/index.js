import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import App from '../src/components/App';
import configureStore from '../src/store/configureStore';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Provider>
);