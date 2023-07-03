import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div>
        <div>
          <nav className="navbar">
            <div className="logo"><img src="HogwartsLogo.png" alt /></div>
            <ul className="navlist">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#" id="cu">Contact Us</a></li>
              <div />
            </ul>
            <div className="searchbar">
              <input className="search" type="text" id="srch" />
              <button type="submit" className="srchbtn">Search</button>
            </div>
          </nav>
        </div>
        <canvas />
      </div>

    </>
  )
}

export default App
