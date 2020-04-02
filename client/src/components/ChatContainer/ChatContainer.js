import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessageAction } from '../../redux/actions'
import './ChatContainer.css'

const ChatContainer = () => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    
    const list = useSelector(state => state.chatsReducer.list)
    const entities = useSelector(state => state.chatsReducer.entities)

    const onChangeHandle = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (message && 0 < message.length) {
            dispatch(sendMessageAction(message))
            setMessage('')
        } else {
            alert('Сообщение не может быть пустым')
        }
    }

    return (
        <div className='chat-container'>
            <div className='chat-container__name-chat'>Name chat: </div>
            <div className='chat-container__messages'>
                <ul>
                    {
                        list.map(id => entities[id]).map((m, i) =>
                            <li key={`${i}:${m.id}`}>
                                <span className='chat-container__sender'>{m.username} | </span>
                                <span>{m.text}</span>
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
