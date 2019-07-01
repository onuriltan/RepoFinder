import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    let res = await axios.get('https://api.github.com/users');
    this.setState({users: res.data, loading: true});
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
