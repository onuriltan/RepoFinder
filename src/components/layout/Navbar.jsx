import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Navbar extends Component {

  static defaultProps = {
    title: 'Repo Finder',
    icon: 'fab fa-github'
  };

  static propTypes = { // check props types to make things correct data type
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    return (
        <nav className="navbar bg-primary">
          <h1>
            <i className={this.props.icon}/> {this.props.title}
          </h1>
        </nav>
    );
  }
}

export default Navbar;