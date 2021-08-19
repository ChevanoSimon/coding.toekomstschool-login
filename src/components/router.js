import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './login/loginform'
import NotFound from './login/NotFound';
import ProtectedRoute from './login/ProtectedRoute';
import Envoirment from './envoirment';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <ProtectedRoute path="/coding" component={Envoirment} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router;