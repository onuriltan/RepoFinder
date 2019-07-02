import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import Alert from './components/layout/Alert'
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    users: [],
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

  // Search Github users
  searchUsers = async text => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
    this.setState({users: res.data.items, loading: false});
  }

  clearUsers = () => {
    this.setState({users: []})
  }

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({alert : {msg, type}})
    setTimeout( () => this.setState({alert: null}),5000)
  }


  render() {
    const {users, loading, alert} = this.state;
    return (
        <div className="App">
          <Navbar title="Repo Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={alert} />
            <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    alert={this.setAlert}
            />
            <Users loading={loading} users={users}/>
          </div>
        </div>
    );
  }

}

export default App;
