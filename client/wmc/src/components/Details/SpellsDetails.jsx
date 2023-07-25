import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar';
import axios from 'axios';

export default function SpellsDetails() {

    const params = useParams();
    const [spell, setSpell] = useState({});

    const getSpell = async () => {

        const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/singleSpell/${params.id}`);
        console.log(res.data);
        setSpell(res.data.spell);

    }

    useEffect(() => {
        getSpell();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="text-light">
                <h1 className='my-5'>Spells Detail</h1>
                {/* Display books in form of cards */}
                <div className="row">
                    <div className="col-md-4">
                        <img src={spell?.image_url} className="card-img-top" />
                    </div>
                    <div className="col-md-8">
                        <h1 className='mb-2'>{spell?.name}</h1>
                        <p className='mb-2'>{spell?.description}</p>
                        <p className='mb-2'>Type : {spell?.category}</p>
                        <audio controls>
                            <source src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells/${params.id}/audio`} type='audio/mp3' />
                        </audio> 
                    </div>
                </div>
            </div>
        </div>
    )
}
