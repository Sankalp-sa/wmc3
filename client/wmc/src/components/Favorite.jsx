import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

// mui imports
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Spinner from "./Elements/Spinner";

export default function Favorite() {

  const [Favorites, setFavorites] = useState();

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getFavorites = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getFavorites`
    );

    console.log(res.data);
    setFavorites(res.data.favorites);
    setLoading(false);
  };

  useEffect(() => {
    getFavorites()
  }, []);

  const handleDelete = (id) => async () => {

    const res = await axios.delete(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/deleteFavorite/${id}`);

    console.log(res.data);
    getFavorites();

  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="text-light">
          <div className="d-flex align-items-center justify-content-center text-light my-3 py-3">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs textColor="white" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab className="fav-tab font2 fs-3 mx-3" label="Character" {...a11yProps(0)} />
                <Tab className="fav-tab font2 fs-3 mx-3" label="Species" {...a11yProps(1)} />
                <Tab className="fav-tab font2 fs-3 mx-3" label="Spells" {...a11yProps(2)} />
                <Tab className="fav-tab font2 fs-3 mx-3" label="Wands" {...a11yProps(3)} />
              </Tabs>
            </Box>
          </div>
          <div className="d-flex text-center align-items-center justify-content-center text-light my-3">
            <CustomTabPanel value={value} index={0}>
              <h1 className="py-5 mb-3 title ">Favorite Characters</h1>
              <div className="row">
                {loading ? <Spinner /> : Favorites.characters?.map((ch) => (
                  <Link to={`/characters/${ch._id}`} style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                    <div key={ch._id} class="container mb-5">
                      <div class="thecard d-flex align-items-center justify-content-center mb-5">
                        <div class="thefront skeleton d-flex align-items-center justify-content-center">
                          <img className='img-front' src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/character/${ch._id}/imageFront`} />
                        </div>
                        <div class="theback">
                          <img src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/character/${ch._id}/imageBack`} />
                        </div>
                      </div>
                      <div className='text-center'>
                        <Link className="ch-btn" to={`/characters/${ch._id}`}>View Details</Link>
                        <Link className="ch-btn ms-5" onClick={handleDelete(ch._id)}>Delete</Link>
                      </div>
                    </div>
                  </Link>
                )
                )}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <h1 className="py-5 mb-3 title ">Favorite Species</h1>
              <div className="row ">
                {Favorites?.species.map((sp) => {
                  return (
                    <>
                      <div className="col-md-6">
                        <div className="card mb-3" style={{ width: "18rem" }}>
                          <img src={sp?.image_url} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{sp?.name}</h5>
                            <p className="card-text">
                              {sp?.description.substring(0, 100)}...
                            </p>
                            {/* <Link to={`/characters/${ch?._id}`} className="btn btn-primary">More Details</Link> */}
                            <button className="btn btn-primary">More Details</button>
                            <button className="btn btn-danger" onClick={handleDelete(sp._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <h1 className="py-5 mb-3 title ">Favorite Spells</h1>
              <div className="row">
                {Favorites?.spells.map((sp) => {
                  return (
                    <>
                      <div className="col-md-6">
                        <div className="card mb-3" style={{ width: "18rem" }}>
                          <img src={sp?.image_url} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{sp?.name}</h5>
                            <p className="card-text">
                              {sp?.description.substring(0, 100)}...
                            </p>
                            {/* <Link to={`/characters/${ch?._id}`} className="btn btn-primary">More Details</Link> */}
                            <Link to='#' className="btn btn-primary">More Details</Link>
                            <button className="btn btn-danger" onClick={handleDelete(sp._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <h1 className="py-5 mb-3 title">Favorite Wands</h1>
              <div className="row d-flex align-items-center justify-content-center">
                {loading ? <Spinner /> : Favorites?.wand?.map((w) => (
                  <Link to='#' style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                    <div key={w._id} class="container mb-5">
                      <div class="d-flex align-items-center justify-content-center mb-5">
                        <div class="thefront skeleton d-flex align-items-center justify-content-center">
                          <img className='img-front' src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/wandImage/${w._id}`} />
                        </div>
                      </div>
                      <div className='d-flex flex-row align-items-center justify-content-center'>
                        <Link className="ch-btn" to={`/wand/${w._id}`}>View Details</Link>
                        <Link className="ch-btn ms-5" onClick={handleDelete(w._id)}>Delete</Link>
                      </div>
                    </div>
                  </Link>
                )
                )}
              </div>
            </CustomTabPanel>

          </div>
        </div>
      </div>
    </div>
  );
}
