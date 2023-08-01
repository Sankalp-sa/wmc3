import React from 'react'

export default function Spinner() {
    return (
        <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
