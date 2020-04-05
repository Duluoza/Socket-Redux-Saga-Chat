import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createChatAction, changeActiveChatAction } from '../../redux/actions'
import './Sider.css'

const Sider = () => {
    const dispath = useDispatch()

    const userName = useSelector(state => state.usersReducer.username)
    const users = useSelector(state => state.usersReducer.users)
    const chats = useSelector(state => state.chatsReducer.chats)
    const activeChat = useSelector(state => state.chatsReducer.activeChat)


    const handleName = (user) => {
        const receivers = chats.map(item => item.name)
        if (receivers.find(item => item.includes(user.name))) {
            const goToChat = chats.find(item => item.name.includes(user.name))
            dispath(changeActiveChatAction(goToChat))
        } else {
            dispath(createChatAction({ user, sender: userName }))
        }
    }

    const handleChat = (chat) => {
        dispath(changeActiveChatAction(chat))
    }

    return (
        <div className='sider'>
            <h3>Chats</h3>
            <ul className='sider__chats'>
                {chats.map(item => {
                    return (
                        <li
                            className={`${item.id === activeChat.id && 'sider__active'}`}
                            key={item.id}
                            onClick={() => handleChat(item)}
                        >
                            {item.name}
                            <div className={`${item.newMessage && 'sider__new-message'}`}></div>
                        </li>
                    )
                })}
            </ul>


            <h3>Users</h3>
            <ul>
                {users.map(item => {
                    if (item.name === userName) { return null }
                    return (
                        <li
                            key={item.id}
                            onClick={() => handleName(item)}
                        >
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sider
