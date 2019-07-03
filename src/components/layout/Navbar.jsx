import React from 'react';
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <Link to='/'>
        <h1>
          <i className={icon}/> {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Repo Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = { // check props types to make things correct data type
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
