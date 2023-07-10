import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import axios from 'axios';


export default function Species() {

    const [species, setSpecies] = useState([]);
    const [page, setPage] = useState(1);

    const getSpells = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getSpecies`);
            console.log(res.data);
            setSpecies(res.data.species);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSpells();
    }, [page]);

    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Speices</h1>
                    {/* Display books in form of cards */}
                    <div className="row">
                        {species.map((sp) => (
                            <div key={sp._id} className='col-md-4 mb-5'>
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={sp.image_url} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{sp.name}</h5>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
