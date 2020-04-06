import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from 'antd';

import { sendMessageAction } from '../../redux/actions'
import './ChatContainer.css'

const ChatContainer = () => {

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const activeChatNow = useSelector(state => state.chatsReducer.activeChat)
    const chatsState = useSelector(state => state.chatsReducer.chats)
    const chat = chatsState.find(item => item.id === activeChatNow.id)
    const chatLength = chat && chat.messages.length

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

    const container = useRef(null);

	const scrollToBottom = () => {
		container.current.scrollTop = container.current.scrollHeight
    };
    
    useEffect(() => {
		scrollToBottom()
	}, [chatLength])

    return (
        <div className='chat-container'>
            <div className='chat-room'>
                <div className='chat-container__name-chat'>{activeChatNow && activeChatNow.name}</div>
                <div className='chat-container__messages' ref={container}>
                    <ul className='chat-thread'>

                        {
                            chat && chat.messages.map(item =>
                                <li key={item.id}>
                                    <span className='chat-container__sender'>{item.username} | </span>
                                    <span>{item.message}</span>
                                </li>
                            )
                        }

                    </ul>
                </div>

                <div className='chat-container__input'>
                    <Input 
                        size="large" 
                        placeholder="Start chatting" 
                        value={message}
                        onChange={onChangeHandle}
                        onPressEnter={onSubmit}
                    />
                    <Button type="primary" size='large' onClick={onSubmit}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer
