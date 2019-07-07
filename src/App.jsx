import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/pages/User'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

// Global States
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

import './App.css';

const App = () => {

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Repo Finder" icon="fab fa-github"/>
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' render={() => (
                  <Fragment>
                    <Search/>
                    <Users/>
                  </Fragment>
                )}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' component={User}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
