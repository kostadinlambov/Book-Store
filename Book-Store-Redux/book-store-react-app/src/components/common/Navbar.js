import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = (props) => {
  const {loggedIn, isAdmin, logout, users, products} = props

  return (
    <header>
      <nav className='navbar-menu'>
        <Link  to='/'>Book Store</Link>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink  to='/store'>Store</NavLink>
        {loggedIn && !isAdmin && <NavLink to='/orders'>My Orders</NavLink>}
        {isAdmin && <NavLink to='/admin/create'>Create New Book</NavLink>}
        {isAdmin && <NavLink to='/admin/orders/pending'>Pending Orders</NavLink>}
        {loggedIn && !isAdmin && <NavLink to='/cart'>Cart</NavLink>}
        {loggedIn && <a href='javascript:void(0)' onClick={logout}>Logout</a>}
        {!loggedIn && <NavLink to='/login'>Login</NavLink>}
        {!loggedIn && <NavLink to='/register'>Register</NavLink>}
      </nav>
    </header>
  )
}

export default Navbar
