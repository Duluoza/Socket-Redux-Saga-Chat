import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logoutAction } from '../../redux/actions'
import './Navbar.css'

const Navbar = () => {

    const nickname = useSelector(state => state.usersReducer.username);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAction())
    }

    return (
        <div className='navbar'>
            <h3 className='navbar__title'>{nickname}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar
