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

export default function Favorite() {

  const [Favorites, setFavorites] = useState();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getFavorites = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getFavorites`
    );

    console.log(res.data);
    setFavorites(res.data.favorites);
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
          <div className="d-flex align-items-center justify-content-center text-light my-3">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs textColor="white" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Favorite Character" {...a11yProps(0)} />
                <Tab label="Favorite Species" {...a11yProps(1)} />
                <Tab label="Favorite Spells" {...a11yProps(2)} />
                <Tab label="Favorite Wands" {...a11yProps(3)} />
              </Tabs>
            </Box>
          </div>
          <div className="d-flex text-center align-items-center justify-content-center text-light my-3">
            <CustomTabPanel value={value} index={0}>
              <h1 className="mb-3">Favorite Characters</h1>
              <div className="row">
                {Favorites?.characters.map((ch) => {
                  return (
                    <>
                      <div className="col-md-6 d-flex align-items-center justify-content-center ">
                        <div className="card mb-3" style={{ width: "18rem" }}>
                          <img src={ch?.imageUrl} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{ch?.name}</h5>
                            <p className="card-text">
                              {ch?.description}
                            </p>
                            <Link to={`/characters/${ch?._id}`} className="btn btn-primary">More Details</Link>
                            <button className="btn btn-danger" onClick={handleDelete(ch._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <h1 className="mb-3">Favorite Species</h1>
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
              <h1 className="mb-3">Favorite Spells</h1>
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
              <h1 className="mb-3">Favorite Wands</h1>
              <div className="row">
                {Favorites?.wand.map((w) => {
                  return (
                    <>
                      <div className="col-md-4">
                        <div className="card mb-3" style={{ width: "18rem" }}>
                          <img src={w?.image_url} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{w?.name}</h5>
                            <p className="card-text">
                              {w?.description.substring(0, 100)}...
                            </p>
                            {/* <Link to={`/characters/${ch?._id}`} className="btn btn-primary">More Details</Link> */}
                            <Link to={`/wand/${w._id}`} className="btn btn-primary">More Details</Link>
                            <button className="btn btn-danger" onClick={handleDelete(w._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </CustomTabPanel>

          </div>
        </div>
      </div>
    </div>
  );
}
