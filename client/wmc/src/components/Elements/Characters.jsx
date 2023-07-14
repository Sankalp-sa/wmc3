import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Characters() {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const pagesize = 4;

    const getCharacters = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getCharacter?page=${page}&pagesize=${pagesize}`);

            console.log(res.data);
            setCharacters(res.data.characters);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacters();
    }, [page])


    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Character</h1>
                    {/* Display books in form of cards */}
                    <div className="row">
                        {characters.map((ch) => (
                            <Link to={`/characters/${ch._id}`} style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                                <div key={ch._id} >
                                    <div className="card" style={{ width: '20rem' }}>
                                        <img src={ch.imageUrl} className="card-img-top" style={{ minHeight: "400px" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{ch.name}</h5>
                                            <a href="#" className="btn btn-primary">More Details</a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                        )}
                    </div>
                    {/* Pagination */}
                    <div className='d-flex align-items-start justify-content-start fs-3'>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button className="page-link" href="#" onClick={() => setPage(page - 1)} aria-label="Previous"
                                    disabled={page === 1 ? true : false}
                                >
                                    <span aria-hidden="true">&laquo;</span>
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
            </div>
        </div>
    )
}
