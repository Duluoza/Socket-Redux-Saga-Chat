import React from 'react'
import { useSelector } from 'react-redux'

import './Sider.css'

const Sider = () => {

    
const users = useSelector(state => state.usersReducer.users)

    return (
        <div className='sider'>
            <h3>Users</h3>
            <ul>
                { users.map((username, i) =>
                <li key={`${i}:${username}`}>
                    {username}
                </li>)
                }
            </ul>
        </div>
    )
}

export default Sider
