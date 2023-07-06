import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import axios from 'axios';


export default function Species() {

    const [species, setSpecies] = useState([]);
    const [page, setPage] = useState(1);

    const getSpells = async () => {
        try {
            const res = await axios.get(`https://legacy--api.herokuapp.com/api/v1/species?page=${page}`);
            console.log(res.data);
            setSpecies(res.data);

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
                            <div key={sp.id} className='col-md-4 mb-5'>
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={sp.image_url ? sp.image_url : "https://www.moranyachts.com/wp-content/uploads/2018/04/image_file.png"} className="card-img-top" style={{ minHeight: "400px" }} />
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
