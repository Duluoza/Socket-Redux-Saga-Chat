import React from 'react'
import { useSelector } from 'react-redux'

import './Sider.css'

const Sider = () => {

    const users = useSelector(state => state.usersReducer.users)    
    const chats = useSelector(state => state.chatsReducer.chats)

    return (
        <div className='sider'>
            <h3>Chats</h3>
            <ul>
                {chats.map(item =>
                    <li key={item.id}>
                        {item.name}
                    </li>)
                }
            </ul>


            <h3>Users</h3>
            <ul>
                {users.map((username, i) =>
                    <li key={`${i}:${username}`}>
                        {username}
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Sider
