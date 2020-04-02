import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessageAction } from '../../redux/actions'
import './ChatContainer.css'

const ChatContainer = () => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const activeChatNow = useSelector(state => state.chatsReducer.activeChat)

    const onChangeHandle = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (message && 0 < message.length) {
            dispatch(sendMessageAction(message, activeChatNow.id))
            setMessage('')
        } else {
            alert('Сообщение не может быть пустым')
        }
    }

    return (
        <div className='chat-container'>
            <div className='chat-container__name-chat'>{activeChatNow && activeChatNow.name}</div>
            <div className='chat-container__messages'>
                <ul>

                    {
                        activeChatNow && activeChatNow.messages.map(item =>
                            <li key={item.id}>
                                <span className='chat-container__sender'>{item.username} | </span>
                                <span>{item.message}</span>
                            </li>
                        )
                    }
                   
                </ul>
            </div>

            <div>
                <form action="" className='chat-container__input'>
                    <input
                        type='text'
                        value={message}
                        onChange={onChangeHandle}
                    />
                    <button
                        onClick={onSubmit}
                    >
                        Send
                </button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer
