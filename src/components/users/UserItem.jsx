import React, { useState } from 'react';
import * as PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Spinner from '../layout/Spinner'

const UserItem = ({user: {login, avatar_url}}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="card text-center">
      <img src={avatar_url} alt="profile_pic" className="round-img" style={{width: '60px'}}
           onLoad={() => {
             setImageLoaded(true)
           }}
      />
      {imageLoaded ?
        <div className="fadeIn">
          <h3 style={{width: '50%', margin: '0 auto', wordBreak: 'break-all'}}>{login}</h3>
          <div>
            <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More </Link>
          </div>
        </div>
        :
        <Spinner/>
      }
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
