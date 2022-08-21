import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

  

  return (
    <div className='nav'>
        <Link className='link' to="/">home page</Link>
      
        <Link to="/post">post page</Link>
       
        <Link to="/posts">posts page</Link>
       
        <Link to="/my-posts">my posts page</Link>


    </div>
  )
}

export default NavBar