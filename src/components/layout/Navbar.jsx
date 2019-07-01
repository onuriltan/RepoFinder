import React from 'react';
import * as PropTypes from 'prop-types'

const Navbar = ({icon, title}) => {
  return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon}/> {title}
        </h1>
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