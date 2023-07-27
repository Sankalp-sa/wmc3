import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import axios from 'axios';

export default function CharacterDetail() {

    const { id } = useParams();

    const [character, setCharacter] = useState();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

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
        getComments();
    }, [])

    const handleComment = (id) => async (e) => {

        e.preventDefault();

        try{
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/addComment/${id}`,{
                comment
            });
            
            console.log(res.data);
            getComments();

        }
        catch(err){
            console.log(err);
        }
    }

    const getComments = async () => {

        try{
            const {data} = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getComment/${id}`);

            console.log(data);
            console.log(data.data.character)
            // for(let i=0;i<res.data.character.length;i++){
            //     setComments(prev => {
            //         return [...prev, res.data.character[i]];
            //     })
            // }
            setComments(data.data.character);

        }
        catch(err){ 
            console.log(err);
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
                    <h1 className='my-5'>Character Detail</h1>
                    {/* Display books in form of cards */}
                    <div className="row mb-3">
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
                                    { element }
                                })}
                            </p>
                            <h4 className='mb-3'>Is Alive : {character?.isAlive ? "YES" : "NO"}</h4>
                        </div>
                    </div>
                    <div className='p-4'>
                        <h1 className='mb-4'>Comments</h1>
                        <form onSubmit={handleComment(character?._id)}>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={comment} onChange={(e) => setComment(e.target.value)} defaultValue={""} style={{height: "100px"}}/>
                            <label htmlFor="floatingTextarea">Comments</label>
                        </div>
                        <button className='btn btn-primary mt-3'>Add Comment</button>
                        </form>
                    </div>
                    <div className='p-4 text-light'>
                        
                        {/* {comments?.length > 0 ? (<h1>Hello Brother {comment[0]} is here</h1>) : (<h1>No comments Brother</h1>)} */}

                        {comments?.map((c) => 
                             (
                                <>
                                    <h3>{c?.user?.name}</h3>
                                    <p>{c?.comment}</p>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
