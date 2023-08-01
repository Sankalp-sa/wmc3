import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';
import Spinner from './Spinner';
import StarIcon from '@mui/icons-material/Star';


export default function Wand() {

    const [wand, setWand] = useState([]);

    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const getWands = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getWands`);

            console.log(res.data);
            setWand(res.data.wands);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getWands();
    }, [])

    const handleFavorite = async (id) => {
        try {
            if (auth) {
                const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/addFavorite/${id}`);

                if (res.data.success === true) {
                    toast.success("Added to Favorite!");
                }

                if (res.data.success === false) {
                    toast.error("Already in Favorite!");
                }
            }
            else {
                toast.error("Please login first!");
            }

        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="text-light d-flex align-items-center justify-content-center flex-column">
                <h1 className='my-3 title text-center pt-5'>Wands</h1>
                {/* Display books in form of cards */}
                {/* <div className="row">
                    {wand.map((w) => (
                        <Link to={`/wand/${w._id}`} style={{ textDecoration: "none" }} className='col-md-4 mb-5'>
                            <div key={w._id} >
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={w.image_url} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{w.owner}+'s wand</h5>
                                        <p className="card-text">{w.description.substring(1, 100) + "..."}</p>
                                        <button className="btn btn-primary" onClick={(e) => {
                                            e.preventDefault();
                                            handleFavorite(w._id);
                                        }}>Add to Favorite</button>
                                        <Link to={`/wand/${w._id}`} className="btn btn-primary">More Detail</Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div> */}

                <div className="row" style={{ padding: "5% 12%" }}>
                    {loading ? <Spinner /> : wand?.map((w) => (
                        <Link to='#' style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                            <div key={w._id} class="container mb-5">
                                <div class="d-flex align-items-center justify-content-center mb-5">
                                    <div class="thefront skeleton d-flex align-items-center justify-content-center">
                                        <img className='img-front' src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/wandImage/${w._id}`} />
                                    </div>
                                </div>
                                <div className='d-flex flex-row align-items-center justify-content-center'>
                                    <Link className="ch-btn" onClick={() => handleFavorite(w._id)}>Add to  <StarIcon /></Link>
                                    <Link className="ch-btn ms-5" to={`/wand/${w._id}`}>View Details</Link>
                                </div>
                            </div>
                        </Link>
                    )
                    )}
                </div>
            </div>
        </div>

    )
}
