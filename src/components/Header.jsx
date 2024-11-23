import React from 'react'
import { Link } from 'react-router-dom'
import { searchRecipe } from '../redux/slices/recipeSlice'
import { useDispatch } from 'react-redux'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  return (
    <nav className='flex bg-green-600 fixed w-full p-5 text-white'>
        <Link className='text-2xl font-bold' to={'/'}>Recipe App</Link>
        <ul className='flex-1 text-right'>
          { insideHome && <li className='list-none inline-block px-5'><input style={{width:'300px'}} className='rounded p-1 text-black' type="text" placeholder='Search products here!'  onChange={e=>dispatch(searchRecipe(e.target.value.toLowerCase()))}  /></li>}
         
        </ul>
    </nav>
  )
}

export default Header