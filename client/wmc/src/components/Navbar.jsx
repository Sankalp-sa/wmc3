import React from 'react'
import {NavLink} from "react-router-dom";


export default function Navbar() {
  return (
    <>
        <div>
          <nav className="my-navbar">
            <div className="logo"><img src="HogwartsLogo.png" alt /></div>
            <ul className="navlist">
              <li><NavLink to="#">About Us</NavLink></li>
              <li><NavLink to="#">Home</NavLink></li>
              <li><NavLink to="#" id="cu">Contact Us</NavLink></li>
              <li><NavLink to="/explore" id="cu">Explore</NavLink></li>
              <div />
            </ul>
            <div className="searchbar">
              <input className="search" type="text" id="srch" />
              <button type="submit" className="srchbtn">Search</button>
            </div>
          </nav>
        </div>
    </>
  )
}
