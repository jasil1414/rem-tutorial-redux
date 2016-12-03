import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignUp from './components/SignUpPage/SignUp';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import requireAuth from './utils/requireAuth';

export default(
    <Route path='/' component={App}>
      <IndexRoute component={Greetings} />
      <Route path='/signup' component={SignUp}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/new-event' component={requireAuth(NewEventPage)}/>
    </Route>

);
