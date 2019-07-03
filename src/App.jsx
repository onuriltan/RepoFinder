import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/pages/User'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

// Global States
import GithubState from './context/github/GithubState'

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async text => {
    setLoading(true);
    let res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);
    setUsers(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let res = await axios.get(`https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
      setLoading(false);
      setUsers(res.data);
    }

    fetchData();
    //eslint-disable-next-line
  }, []);

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    let res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);
    setUser(res.data);
    setLoading(false);
    //eslint-disable-next-line
  };

  // Get single Github user
  const getUserRepos = async (username) => {
    setLoading(true);
    let res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`);
    setRepos(res.data);
    setLoading(false);
  };


  const clearUsers = () => {
    setUsers([])
  };

  //Set Alert
  const setAlertMsg = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000)
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Repo Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers}
                          showClear={users.length > 0}
                          alert={setAlertMsg}
                  />
                  <Users loading={loading} users={users}/>
                </Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser}
                      getUserRepos={getUserRepos} repos={repos}
                      user={user} loading={loading}/>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
