import React from 'react'
import { NavLink } from "react-router-dom";
// import all_data from '../animation';
import all_data from '../animation';

export default function Navbar() {
  return (
    <>
      <nav className="my-navbar">
        <div className="logo"><a href="#home"><img src="HogwartsLogo.png" alt /></a></div>
        <ul className="navlist">
          <li><NavLink to="#">About Us</NavLink></li>
          <li><NavLink to="#">Home</NavLink></li>
          <li><NavLink to="#" id="cu">Contact Us</NavLink></li>
          <li><NavLink to="/explore" id="cu">Explore</NavLink></li>
          <div />
        </ul>
        <div className="searchbar">
          <input className="search" type="text" id="srch" onClick={() => all_data.myfun01()} />
          <button type="submit" className="srchbtn">Search</button>
        </div>
      </nav>
    </>
  )
}
