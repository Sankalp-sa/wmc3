import React, { useState } from 'react'
import axios from 'axios';

export default function CreateWand() {

    // wand States

    const [owner, setOwner] = useState('');
    const [wandDis, setWandDis] = useState('');
    const [wandImg, setWandImg] = useState('');
    const [woodId, setWoodId] = useState('');
    const [coreId, setCoreId] = useState('');
    const [length, setLength] = useState('');

    // core States

    const [coreName, setCoreName] = useState('');
    const [coreDis, setCoreDis] = useState('');
    const [coreImg, setCoreImg] = useState('');

    // wood States

    const [woodName, setWoodName] = useState('');
    const [woodDis, setWoodDis] = useState('');
    const [binomialName, setBinomialName] = useState('');
    const [woodImg, setWoodImg] = useState('');

    const handleCoreSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append('name', coreName);
            formData.append('description', coreDis);
            formData.append('image_url', coreImg);

            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/createCore`, 
                formData
            );

            console.log(res.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleWoodSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('name', woodName);
        formData.append('description', woodDis);
        formData.append('binomialName', binomialName);
        formData.append('image_url', woodImg);

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/createWood`, 
                formData
            );

            console.log(res.data);

        }
        catch (err) {
            console.log(err);
        }

    }

    const handleWandSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append('owner', owner);
            formData.append('description', wandDis);
            formData.append('wandImage', wandImg);
            formData.append('wood', woodId);
            formData.append('core', coreId);
            formData.append('length', length);

            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/createWand`, 
                formData
            );

            console.log(res.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        // coreSchema
        //  {
        //     name: { type: String, required: true },
        //     description: { type: String, required: true },
        //     image_url: { type: String, required: true },
        // } 

        // const woodSchema = new mongoose.Schema(
        //     {
        //         name: { type: String, required: true },
        //         description: { type: String, required: true },
        //         binomialName: { type: String, required: true },
        //         image_url: { type: String, required: true },
        //     }
        // );

        // const wandSchema = new mongoose.Schema(
        //     {
        //         owner: { type: String, required: true },
        //         description: { type: String, required: true },
        //         image_url: { type: String, required: true },
        //         wood: { type: mongoose.Schema.Types.ObjectId, ref: "wood", required: true },
        //         core: { type: mongoose.Schema.Types.ObjectId, ref: "core", required: true },
        //         length: { type: String, required: true },
        //     }
        // );

        <>
            <div>
                <form onSubmit={handleCoreSubmit}>
                    <input type="text" placeholder='core name' onChange={e => setCoreName(e.target.value)} />
                    <input type="text" placeholder='Core description' onChange={e => setCoreDis(e.target.value)} />
                    <input type="text" placeholder='Core imageurl' onChange={e => setCoreImg(e.target.value)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleWoodSubmit}>
                    <input type="text" placeholder='wood name' onChange={e => setWoodName(e.target.value)} />
                    <input type="text" placeholder='wood description' onChange={e => setWoodDis(e.target.value)} />
                    <input type="text" placeholder='binomial name' onChange={e => setBinomialName(e.target.value)} />
                    <input type="text" placeholder='wood imageurl' onChange={e => setWoodImg(e.target.value)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleWandSubmit}>
                    <input type="text" placeholder='owner' onChange={e => setOwner(e.target.value)} />
                    <input type="text" placeholder='description' onChange={e => setWandDis(e.target.value)} />
                    <input type="file" onChange={(e) => setWandImg(e.target.files[0])} />
                    <input type="text" placeholder='wood' onChange={e => setWoodId(e.target.value)} />
                    <input type="text" placeholder='core' onChange={e => setCoreId(e.target.value)} />
                    <input type="text" placeholder='length' onChange={e => setLength(e.target.value)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>

    )
}
