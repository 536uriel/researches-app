import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <Link to="/">home page</Link>
        <br />
        <Link to="/post">post page</Link>
        <br />
        <Link to="/posts">posts page</Link>
        <br />
        <Link to="/my-posts">my posts page</Link>


    </div>
  )
}

export default NavBar