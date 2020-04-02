import React from 'react'

import Sider from '../../components/Sider/Sider'
import ChatContainer from '../../components/ChatContainer/ChatContainer'
import Navbar from '../../components/Navbar/Navbar'
import './ChatPage.css'

const ChatPage = () => {

    return (
        <div className="chat-page">
            <Navbar />
            <div className='chat-page__wrapper'>
                <Sider />
                <ChatContainer />
            </div>
        </div>
    )
}

export default ChatPage
