import React, {useState , useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import all_data from '../animation';
import all_data from '../animation';
import { useAuth } from '../contexts/auth';
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import axios from 'axios';

export default function Navbar() {

  const { auth, setAuth } = useAuth();

  const [search, setSearch] = useState();

  const [favoriteCount, setFavoriteCount] = useState(0);

  const navigate = useNavigate();

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

      const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getFavoriteCount`);

      console.log(res.data);
      setFavoriteCount(res.data.favoriteCount);
      
    } catch (error) {
      
      console.log(error)
    }
  }

  useEffect(() => {
    getFavoriteCount();
  }, [])

  return (
    <>
      <nav className="my-navbar container-fluid sticky-top border border-white p-2">
        <div className="logo"><a href="#home"><img src={`http://localhost:5173/Images/HogwartsLogo.png`} alt /></a></div>
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
          {/* <div className="searchbar"> */}
            <input className="search" type="text" id="srch" onChange={(e) => setSearch(e.target.value)} onClick={() => all_data.myfun01()} />
            <button type="submit" onClick={
              () => {
                navigate(`/search/${search}`);
              }
            } className="srchbtn">Search</button>
          {/* </div>  */}
          </form>
          <li>
          <Badge badgeContent={favoriteCount} color="primary">
            <NavLink to="/users/favorite"><StarIcon fontSize='large'/></NavLink>
          </Badge>
          </li>
        </ul>
      </nav>
    </>
  )
}
