import React from 'react'
import Header from './Header'
import Contant from './Contant'
import Footer from './Footer'

const Componats = () => {
  return (
    <>
      <div className='Header'>
        <Header />
      </div>

      <div className='contant'>
        <Contant />
      </div>

      <div className='Footer'>
        <Footer />
      </div>
    </>
  )
}

export default Componats