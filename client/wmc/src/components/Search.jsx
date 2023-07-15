import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Search() {

    const params = useParams();
    const keyword = params?.keyword;

    const [result, setResult] = useState({});

    const getSearchResult = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/search/${keyword}`);

            console.log(res.data);
            setResult(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSearchResult();
    }, [keyword]);

    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='my-5'>Search Results</h1>
                    <h1 className='mb-3'>Characters</h1>
                    {result?.character?.length > 0 ? (
                        <>
                            <div className='row'>
                                {result?.character?.map((ch) => {
                                    return (
                                        <>
                                            <div className='col-md-6'>
                                                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                                                    <div className="row g-0">
                                                        <div className="col-md-4">
                                                            <img src={ch.imageUrl} className="img-fluid rounded-start" alt="..." />

                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{ch.name}</h5>
                                                                <p className="card-text">{ch.description}</p>
                                                                <button className="btn btn-dark">More Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <h1>No Character Found</h1>
                    )
                    }
                    <h1 className='mb-3'>Wands</h1>
                    {result?.wand?.length > 0 ? (
                        <>
                            <div className='row'>
                                {result?.wand?.map((w) => {
                                    return (
                                        <>
                                            <div className='col-md-6'>
                                                <div className="card" style={{ width: '18rem' }}>
                                                    <img src={w.image_url} className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{w.owner}'s Wand</h5>
                                                        <p className="card-text">{w.description}</p>
                                                        <a href="#" className="btn btn-dark">More Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <h1>No Wand Found</h1>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
