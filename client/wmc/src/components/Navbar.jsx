import React from 'react'
import { NavLink } from "react-router-dom";
// import all_data from '../animation';
import all_data from '../animation';
import { useAuth } from '../contexts/auth';

export default function Navbar() {

  const { auth, setAuth } = useAuth();

  function handleLogOut() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  }


  return (
    <>
      <nav className="my-navbar">
        <div className="logo"><a href="#home"><img src="HogwartsLogo.png" alt /></a></div>
        <ul className="navlist">
          <li><NavLink to="#">About Us</NavLink></li>
          <li><NavLink to="#">Home</NavLink></li>
          <li><NavLink to="#" id="cu">Contact Us</NavLink></li>
          <li><NavLink to="/explore" id="cu">Explore</NavLink></li>
          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link"
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  role="button"
                >
                  {auth?.user?.name}
                </NavLink>
              </li>
              <li className='text-light'>
                <NavLink
                  onClick={handleLogOut}
                  to="/"
                  className="dropdown-item"
                  aria-current="page"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <div className="searchbar">
            <input className="search" type="text" id="srch" onClick={() => all_data.myfun01()} />
            <button type="submit" className="srchbtn">Search</button>
          </div>
        </ul>
      </nav>
    </>
  )
}
