import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../asset/scss/style.scss'
import Home from './Home';
import MainPage from './MainPage';
import Dashboard from './dashboard';
import AuthRoute from '../component/Auth'

export default class App extends Component {
  render() {
    return <Switch>
        <AuthRoute path="/dashboard" component={Dashboard} />
        {/* <Redirect exact path="/" to="/" /> */}
        <Route exact path={"/hotel"} component={MainPage} />
        <Route path={"/flight"} component={MainPage} />
        <Route path={"/car"} component={MainPage} />
        <Route path={"/package"} component={MainPage} />
        <Route path={"/activity"} component={MainPage} />
        <Route component={ER_PAGE} />
        {/* <Route path="/home" exact component={Home}/> */}
      </Switch>;
  }
}

const ER_PAGE = () => <div> 404 </div>