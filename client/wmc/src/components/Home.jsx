import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-md-2">  
          <Sidebar />
        </div>
      </div>
    </>
  )
}
