import React from 'react'

import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewBooks from '../Components/NewBooks/NewBooks'
import NewLetter from '../Components/NewLetter/NewLetter'

const home = () => {
  
  return (
    <div className='home'>
      
      <Hero></Hero>
      <Popular></Popular>
      <Offers></Offers>
      <NewBooks></NewBooks>
      <NewLetter></NewLetter>
    </div>
  )
}

export default home
