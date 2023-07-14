import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import axios from 'axios';

export default function CharacterDetail() {

    const { id } = useParams();

    const [character, setCharacter] = useState({});

    const getCharacter = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getCharacter/${id}`);

            console.log(res.data);
            setCharacter(res.data.character);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCharacter();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='my-5'>Character Detail</h1>
                    {/* Display books in form of cards */}
                    <div className="row">
                        <div className="col-md-4">
                            <img src={character?.imageUrl} className="card-img-top" />
                        </div>
                        <div className="col-md-8">
                            <h1 className='mb-2'>{character?.name}</h1>
                            <p className='mb-2'>{character?.description}</p>
                            <p className='mb-2'>Age : {character?.age}</p>
                            <p className='mb-2'>House : {character?.house}</p>
                            <p className='mb-2'>Blood Status : {character?.bloodStatus}</p>
                            <hr />
                            <h4 className='mb-2'>Wand :</h4>
                            <p className='mb-3'>Wood : {character?.wand?.wood}</p>
                            <p className='mb-3'>Core : {character?.wand?.core}</p>
                            <p className='mb-3'>Length : {character?.wand?.length}</p>
                            <hr />
                            <h4 className='mb-2'>Patronus :</h4>
                            <p className='mb-3'>{character?.patronus}</p>
                            <hr />
                            <h4 className='mb-2'>Skills :</h4>
                            <p className='mb-3'>
                            {character?.skills?.forEach(element => {
                                {element}
                            })}
                            </p>
                            <h4 className='mb-3'>Is Alive : {character?.isAlive ? "YES":"NO"}</h4> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
