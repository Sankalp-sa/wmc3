import React, { useState, useEffect } from 'react'
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import all_data from '../animation';
import all_data from '../animation';
import { useAuth } from '../contexts/auth';
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Navbar() {

  const { auth, setAuth } = useAuth();

  const [search, setSearch] = useState();

  const [favoriteCount, setFavoriteCount] = useState(0);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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

  const getFavoriteCount = async () => {

    try {

      if (auth?.user) {
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getFavoriteCount`);
        console.log(res.data);
        setFavoriteCount(res.data.favoriteCount);
      }

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {
    getFavoriteCount();
  }, [])

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{ backgroundColor: "rgb(39, 38, 38)" }}>
        <div className="container-fluid">
          <div className="logo"><a href="#home"><img src={`${import.meta.env.VITE_REACT_API_APP}/Images/HogwartsLogo.png`} alt /></a></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0 navlist">
              <li className='nav-item'><NavLink className='nav-link' to="#">About Us</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to="#">Home</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to="#" id="cu">Contact Us</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to="#" onClick={handleClickOpen} id="cu">Explore</NavLink></li>
              {!auth.user ? (
                <>
                  <li className='nav-item'>
                    <NavLink
                      to="/register"
                      aria-current="page"
                      className='nav-link'
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to="/login"
                      aria-current="page"
                      className='nav-link'
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink
                      role="button"
                      className='nav-link'
                    >
                      {auth?.user?.name}
                    </NavLink>
                  </li>
                  <li className='nav-item text-light'>
                    <NavLink
                      className='nav-link'
                      onClick={handleLogOut}
                      to="/"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex searchbar justify-content-end" role="search">
              <input className="search px-2" type="text" id="srch" onChange={(e) => setSearch(e.target.value)} onClick={() => all_data.myfun01()} />
              <button type="submit" onClick={
                () => {
                  navigate(`/search/${search}`);
                }
              } className="srchbtn">Search</button>
              <Badge className='mx-3' badgeContent={favoriteCount} color="primary">
                <NavLink to="/users/favorite"><StarIcon fontSize='large' /></NavLink>
              </Badge>
            </form>
          </div>
        </div>
      </nav>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{opacity: "0.9"}}
      >
        <div className=' h-100 w-100'>
          <div className="container-fluid dialog-div vertical-center fs-2 font2 flex-column">
            <Link to="/species" className="nav-link py-3 px-2">
              Species
            </Link>
            <Link to="/books" className="nav-link py-3 px-2">
              Books
            </Link>
            <Link to="/characters" className="nav-link py-3 px-2">
              Characters
            </Link>
            <Link to="/spells" className="nav-link py-3 px-2">
              Spells
            </Link>
            <Link to="/houses" className="nav-link py-3 px-2">
              Houses
            </Link>
            <Link to="/wands" className="nav-link py-3 px-2">
              Wands
            </Link>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </Dialog>


      {/* <nav className="my-navbar container-fluid sticky-top p-2 shadow">
        <div className="logo"><a href="#home"><img src={`${import.meta.env.VITE_REACT_API_APP}/Images/HogwartsLogo.png`} alt /></a></div>
        <ul className="navlist">
          <li><NavLink to="#">About Us</NavLink></li>
          <li><NavLink to="#">Home</NavLink></li>
          <li><NavLink to="#" id="cu">Contact Us</NavLink></li>
          <li><NavLink to="/explore" id="cu">Explore</NavLink></li>
          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li >
                <NavLink
                  role="button"
                >
                  {auth?.user?.name}
                </NavLink>
              </li>
              <li className='text-light'>
                <NavLink
                  onClick={handleLogOut}
                  to="/"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <form class="d-flex searchbar justify-content-end" role="search">
            <input className="search" type="text" id="srch" onChange={(e) => setSearch(e.target.value)} onClick={() => all_data.myfun01()} />
            <button type="submit" onClick={
              () => {
                navigate(`/search/${search}`);
              }
            } className="srchbtn">Search</button>
          </form>
          <li>
            <Badge badgeContent={favoriteCount} color="primary">
              <NavLink to="/users/favorite"><StarIcon fontSize='large' /></NavLink>
            </Badge>
          </li>
        </ul>
      </nav> */}
    </>
  )
}
