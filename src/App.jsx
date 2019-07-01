import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    let github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
    let github_client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/users?client_id=${github_client_id}&client_secret=${github_client_secret}`);
    this.setState({users: res.data, loading: false});
  }


  render() {
    const {users, loading} = this.state;
    return (
        <div className="App">
          <Navbar title="Repo Finder" icon="fab fa-github"/>
          <div className="container">
            <Users loading={loading} users={users}/>
          </div>
        </div>
    );
  }

}

export default App;
