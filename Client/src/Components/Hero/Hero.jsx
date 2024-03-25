import React from 'react'
import './Hero.css'
import handicon from '../Assets/wel.png'
//simport arrowicon from '../Assets/hand-right.jpg'
import heroimg from '../Assets/1.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2>ƯU ĐÃI CHỈ VỚI SÁCH VỪA VỀ!!</h2>
        <div>
            <div className='hero-hand-icon'>
                <p>NEW</p>
                <img src={handicon} alt='' />
            </div>
            <p>Books</p>
            <p>cho mọi người</p>
            <button>Latest Books</button>
        </div>
      </div>
      <div>
        <div className='hero-right'>
          <img src={heroimg} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Hero
