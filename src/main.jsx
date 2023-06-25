import React from 'react'
import ReactDOM from 'react-dom/client'
import {DashboardApp} from './DashboardApp'
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <DashboardApp />
      </BrowserRouter>
    </Provider>
)
