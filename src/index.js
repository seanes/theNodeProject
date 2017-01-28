import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './Components/Root';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
import './styles/core.scss'

render(
    <Provider store={store}>
        <Root history={history}/>
    </Provider>,
    document.getElementById('root')
);