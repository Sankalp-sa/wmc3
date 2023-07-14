import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function WandDetail() {

    const [wand, setWand] = useState({});

    const params = useParams();

    useEffect(() => {
        getWand();
    }, [params.id])

    const getWand = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getWand/${params.id}`);

            console.log("hello");
            console.log(res);

            console.log(res.data);
            setWand(res.data.wand);

        }
        catch (error) {
            console.log(error);
        }

    }

    console.log(wand);

    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="row" style={{ padding: "5% 10%" }}>
                    <div className="col-md-4">
                        <img src={wand.image_url} alt='' />
                    </div>
                    <div className="col-md-8">
                        <h1 className='text-light'>{wand.owner}'s wand</h1>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {wand?.core?.name}
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src={wand?.core?.image_url} alt='' />
                                            </div>
                                            <div className="col-md-8">
                                                <h4>{wand?.core?.name}</h4>
                                                <p>{wand?.core?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        {wand?.wood?.name}
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src={wand?.wood?.image_url} alt='' />
                                            </div>
                                            <div className="col-md-8">
                                                <h4>{wand?.wood?.name}</h4>
                                                <p>{wand?.wood?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <h4 className='text-light'>Length : {wand.length}</h4>
                        <p className='text-light'>{wand.description}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}
