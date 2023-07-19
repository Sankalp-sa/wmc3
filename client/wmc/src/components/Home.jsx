import React from 'react'
import Navbar from './Navbar'
import { useAuth } from '../contexts/auth'

export default function Home() {

  const { auth } = useAuth();

  console.log(auth)

  return (
    <>
      <Navbar />
    </>
  )
}
