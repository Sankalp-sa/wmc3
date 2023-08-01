import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import {toast} from 'react-hot-toast';


export default function Species() {

    const [species, setSpecies] = useState([]);
    const [page, setPage] = useState(1);

    const {auth} = useAuth();

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
            toast.error(error.response.data.message);
        }
    }   

    return (
        <div>
            <Navbar />
                <div className="text-light">
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
                                        <button className="btn btn-primary" onClick={(e) => {
                                            e.preventDefault();
                                            handleFavorite(sp._id);
                                        }}>Add to Favorite</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}
