import React, { useContext } from 'react'
import './CSS/Category.css'
import { Context } from '../Context/Context';
import  dropdown  from '../Components/Assets/dropdown.png'
import Item from '../Components/Item/Item';
const Category = (props) => {
  const {all_books} = useContext(Context);
  return (
    <div className='category-book'>
      <img className='category-banner' src={props.banner} alt=''/>
      <div className='category-IndexBook'>
        <p>
          <span>Showing 1-12</span> out of 14 book
        </p>
        <div className='category-sort'>
          Sort by <img src={dropdown} alt=''/>
        </div>
      </div>
      <div className='category-allbook'>
        {all_books.map((item,i)=>{
          if(props.category===item.category) {
          return<Item key={i} id={item.id} name={item.name} image={item.image}  />
        }
        else {
          return null;
        }
        })}
      </div>
      <div className='category-more'>
        Explore More
      </div>
    </div>
  )
}

export default Category
