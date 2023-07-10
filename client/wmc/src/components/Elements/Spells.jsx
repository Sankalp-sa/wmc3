import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import axios from 'axios';

export default function Spells() {

    const [spells, setSpells] = useState([]);

    const getSpells = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells`);

            console.log(res.data);

            setSpells(res.data.spells);


        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getSpells();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Spells</h1>
                    {spells.map((sp) => (
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={sp.image_url} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{sp.name}</h5>
                                <p className="card-text">{sp.description.substring(1, 100)+"..."}</p>
                                <audio controls>
                                    <source src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells/${sp._id}/audio`} type='audio/mp3'/>
                                </audio>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
