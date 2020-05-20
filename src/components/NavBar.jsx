import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {

  const handleLogout = (e) => {
   let  state = {user: {
        username: "",
        id: 0
      },
      token: "",
      contents: []
    }
   props.clearUser(state)
  }

  
  let loggedIn = (localStorage.length !== 0)
  return(
    <ul className="nav">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!loggedIn ?
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      :
      ""
       }
      {loggedIn ?
      <li>
        <NavLink onClick={handleLogout} to="/logout">Logout</NavLink>
      </li>
        :
         ""
       }
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      {loggedIn ?
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      :
      ""
      }
    </ul>
  )
};

export default NavBar;