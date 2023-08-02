import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';
import StarIcon from '@mui/icons-material/Star';
import Spinner from './Spinner';

export default function Characters() {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const pagesize = 4;
    const [loading, setLoading] = useState(true);

    // const [imageFront, setImageFront] = useState([]);

    const { auth } = useAuth();

    const getCharacters = async () => {
        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getCharacter?page=${page}&pagesize=${pagesize}`);
            console.log(res.data);
            setCharacters(res.data.characters);
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacters();
    }, [page])

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

    return (
        <div>
            <Navbar />
            <div className="row">
                <h1 className='my-5 text-center title'>Characters</h1>
                {/* Display books in form of cards */}
                <div className="row d-flex align-items-center justify-content-center" style={{padding: "3% 12%"}}>
                    {loading ? <Spinner/> : characters?.map((ch) => (
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
                                    <Link className="ch-btn" onClick={() => handleFavorite(ch._id)}>Add to  <StarIcon/></Link>
                                    <Link className="ch-btn ms-5" to={`/characters/${ch._id}`}>View Details</Link>
                                </div>
                            </div>
                        </Link>
                    )
                    )}
                </div>

            </div>
            {/* Pagination */}
            <div className='d-flex align-items-center justify-content-center fs-3'>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" href="#" onClick={() => setPage(page - 1)} aria-label="Previous"
                            disabled={page === 1 ? true : false}
                        >
                            <span aria-hidden="true"> &laquo;</span>
                        </button>
                    </li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(1)}>1</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(2)}>2</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(3)}>3</a></li>
                    <li className="page-item">
                        <button className="page-link" href="#" onClick={() => setPage(page + 1)} aria-label="Next"
                            disabled={characters.length < pagesize ? true : false}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
