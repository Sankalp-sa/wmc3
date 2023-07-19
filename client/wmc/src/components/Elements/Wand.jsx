import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';

export default function Wand() {

    const [wand, setWand] = useState([]);

    const { auth } = useAuth();

    const getWands = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getWands`);

            console.log(res.data);
            setWand(res.data.wands);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getWands();
    }, [])

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
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Wands</h1>
                    {/* Display books in form of cards */}
                    <div className="row">
                        {wand.map((w) => (
                        <Link to={`/wand/${w._id}`} style={{textDecoration: "none"}} className='col-md-4 mb-5'>
                            <div key={w._id} >
                                <div className="card" style={{ width: '20rem' }}>
                                    <img src={w.image_url} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{w.owner}+'s wand</h5>
                                        <p className="card-text">{w.description.substring(1, 100) + "..."}</p>
                                        <button className="btn btn-primary" onClick={(e) => {
                                            e.preventDefault();
                                            handleFavorite(w._id);
                                        }}>Add to Favorite</button>
                                        <Link to={`/wand/${w._id}`} className="btn btn-primary">More Detail</Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
