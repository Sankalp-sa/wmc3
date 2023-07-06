import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import axios from 'axios';

export default function Characters() {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const pagesize = 20;

    const getCharacters = async () => {
        try {
            const res = await axios.get(`https://legacy--api.herokuapp.com/api/v1/characters?page=${page}`);

            console.log(res.data);
            setCharacters(res.data);

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
                            <div key={ch.id} className='col-md-4 mb-5'>
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={ch.image_url ? ch.image_url : "https://www.moranyachts.com/wp-content/uploads/2018/04/image_file.png"} className="card-img-top" style={{ minHeight: "400px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{ch.name}</h5>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                    {/* Pagination */}
                    <div className='d-flex align-items-start justify-content-start fs-3'>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => setPage(page - 1)} aria-label="Previous"
                                    disabled={page < 1 ? true : false}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(1)}>1</a></li>
                            <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(2)}>2</a></li>
                            <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(3)}>3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => setPage(page + 1)} aria-label="Next"
                                    disabled={characters.length < pagesize ? true : false}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
