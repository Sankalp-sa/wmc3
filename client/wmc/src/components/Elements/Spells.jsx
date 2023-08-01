import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';

export default function Spells() {

    const [spells, setSpells] = useState([]);

    const { auth } = useAuth();

    const getSpells = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells`);
            console.log(res.data);
            setSpells(res.data.spells);


        } catch (error) {
            console.log(error)
        }
    }

    const handleFavorite = async (id) => {
        try{
            if(auth){
                const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/addFavorite/${id}`);
                if(res.data.success === true){
                    toast.success("Added to Favorite!");
                }
                
                if(res.data.success === false){
                    toast.error("Already in Favorite!");
                }
            }
            else{
                toast.error("Please login first!");
            }
        }
        catch(error){
            console.log(error);
            toast.error("Please login first!");
        }
    }

    useEffect(() => {
        getSpells();
    }, [])

    return (
        <div>
            <Navbar />
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Spells</h1>
                    <div className='row gap-3'>
                        {spells.map((sp) => (
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
                </div>
            </div>
    )
}
