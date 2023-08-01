import React, { useState } from 'react'
import axios from 'axios';

export default function CreateCharacter() {

    const [photoFront, setPhotoFront] = useState("");
    const [photoBack, setPhotoBack] = useState("");
    const [name, setName] = useState("");
    const [house, setHouse] = useState("");
    const [description, setDescription] = useState("");
    const [wandId, setWandId] = useState("");
    const [bloodStatus, setBloodStatus] = useState("");
    const [patronus, setPatronus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("imageFront", photoFront);
        formData.append("imageBack", photoBack);
        formData.append("name", name);
        formData.append("house", house);
        formData.append("description", description);
        formData.append("wandId", wandId);
        formData.append("bloodStatus", bloodStatus);
        formData.append("patronus", patronus);

        try {

            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/createCharacter`, formData);

            console.log(res.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
           <form onSubmit={handleSubmit}> 
            <input type="text" placeholder="Character Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="house" onChange={(e) => setHouse(e.target.value)}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" placeholder="wand id" onChange={(e) => setWandId(e.target.value)}/>
            <input type="text" placeholder="bloodStatus" onChange={(e) => setBloodStatus(e.target.value)}/>
            <input type="text" placeholder="bloodStatus" onChange={(e) => setBloodStatus(e.target.value)}/>
            <input type="text" placeholder='patronus' onChange={(e) => setPatronus(e.target.value)}/>
            <input
                type="file"
                onChange={(e) => setPhotoFront(e.target.files[0])}
            />
            <input
                type="file"
                onChange={(e) => setPhotoBack(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}
