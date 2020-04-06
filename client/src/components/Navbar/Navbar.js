import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd';


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
            <Button size='default'  onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Navbar
