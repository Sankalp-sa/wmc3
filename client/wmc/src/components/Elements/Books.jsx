import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

export default function Books() {

    const [books, setBooks] = useState([]);

    const getbooks = async () => {
        let res = await axios.get("https://legacy--api.herokuapp.com/api/v1/books");
        console.log(res.data);
        setBooks(res.data);
    }

    useEffect(() => {
        getbooks();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 text-light">
                    <h1 className='mb-5'>Books</h1>
                    {/* Display books in form of cards */}
                    <div className="row">
                        {books.map((book) => (
                                <div key={book.id} className='col-md-4 mb-5'>
                                    <div className="card" style={{ width: '20rem' }}>
                                        <img src={book.image_url} className="card-img-top"  />
                                        <div className="card-body">
                                            <h5 className="card-title">{book.title}</h5>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
