import React from 'react';
import * as PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <NavLink exact to='/'>
        <h1>
          <i className={icon}/> {title}
        </h1>
      </NavLink>
      <ul>
        <li>
          <NavLink exact to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink exact to='/about'>About</NavLink>
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
