import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from './Routes/App';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import Home from './Routes/Home';
import Events from './Routes/Events';
import Event from './Routes/Event';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
import './styles/core.scss'

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="login" component={Login}/>
          <Route path="signup" component={SignUp}/>
          <Route path="events" component={Events}/>
          <Route path="/events/:eventId" component={Event}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
);