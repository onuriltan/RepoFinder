import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/pages/User'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
    this.setState({users: res.data, loading: false});
  }

  // Get single Github user
  getUser = async (username) => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
    this.setState({user: res.data, loading: false});
  };

  // Search Github users
  searchUsers = async text => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
    this.setState({users: res.data.items, loading: false});
  };

  clearUsers = () => {
    this.setState({users: []})
  };

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setTimeout(() => this.setState({alert: null}), 5000)
  };


  render() {
    const {users, loading, alert, user} = this.state;
    return (
        <Router>
          <div className="App">
            <Navbar title="Repo Finder" icon="fab fa-github"/>
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route exact path='/' render={props => (
                    <Fragment>
                      <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                              showClear={users.length > 0}
                              alert={this.setAlert}
                      />
                      <Users loading={loading} users={users}/>
                    </Fragment>
                )}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' render={props => (
                    <User {...props} getUser={this.getUser}
                          user={user} loading={loading}/>
                )}/>
              </Switch>
            </div>
          </div>
        </Router>

    );
  }

}

export default App;
