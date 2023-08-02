import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
// import Sidebar from './Sidebar';
import Spinner from './Elements/Spinner';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../contexts/auth';
import toast from 'react-hot-toast';

export default function Search() {

    const params = useParams();
    const keyword = params?.keyword;

    const [result, setResult] = useState({});

    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const getSearchResult = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/search/${keyword}`);

            console.log(res.data);
            setResult(res.data.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleFavorite = async (id) => {
        try {
            if (auth?.user) {
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

    useEffect(() => {
        getSearchResult();
    }, [keyword]);

    return (
        <div>
            <Navbar />
            <div className="text-light d-flex align-items-center justify-content-center flex-column">
                <h1 className='my-5 title text-center'>Search Results</h1>
                <h1 className='mb-3 title text-center'>Characters</h1>
                {result?.character?.length > 0 ? (
                    <>
                        <div className="row d-flex align-items-center justify-content-center" style={{ padding: "3% 12%" }}>
                            {loading ? <Spinner /> : result?.character?.map((ch) => (
                                <Link to={`/characters/${ch._id}`} style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                                    <div key={ch._id} class="container mb-1">
                                        <div class="thecard d-flex align-items-center justify-content-center mb-5">
                                            <div class="thefront skeleton d-flex align-items-center justify-content-center">
                                                <img className='img-front' src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/character/${ch._id}/imageFront`} />
                                            </div>
                                            <div class="theback">
                                                <img src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/character/${ch._id}/imageBack`} />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            <Link className="ch-btn" onClick={() => handleFavorite(ch._id)}>Add to  <StarIcon /></Link>
                                            <Link className="ch-btn ms-5" to={`/characters/${ch._id}`}>View Details</Link>
                                        </div>
                                    </div>
                                </Link>
                            )
                            )}
                        </div>
                    </>
                ) : (
                    <h1>No Character Found</h1>
                )
                }
                <h1 className='mb-3 title text-center'>Wands</h1>
                {result?.wand?.length > 0 ? (
                    <>
                        <div className="row d-flex align-items-center justify-content-center" style={{ padding: "5% 12%" }}>
                            {loading ? <Spinner /> : result?.wand?.map((w) => (
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
                    </>
                ) : (
                    <h1>No Wand Found</h1>
                )
                }
                <h1 className='mb-3 title text-center'>Spells</h1>
                {result?.spell?.length > 0 ? (
                    <>
                        <div className='row gap-3'>
                        {result.spell.map((sp) => (
                            <Link to={`/spells/${sp._id}`} className="col-md-4 text-decoration-none" >
                            <div>
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={sp.image_url} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title">{sp.name}</h4>
                                        <h5 className="card-title">Category : {sp.category}</h5>
                                        <p className="card-text">{sp.description.substring(1, 100) + "..."}</p>
                                        <audio controls>
                                            <source src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells/${sp._id}/audio`} type='audio/mp3' />
                                        </audio>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                        <button className="btn btn-primary" onClick={(e) => {
                                            e.preventDefault();
                                            handleFavorite(sp._id);
                                        }}>Add to Favorite</button>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                    </>
                ) : (
                    <h1>No Spell Found</h1>
                )}
            </div>
        </div>
    )
}
