import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';

import { createChatAction, changeActiveChatAction } from '../../redux/actions'
import './Sider.css'

const { SubMenu } = Menu;

const Sider = () => {
    const dispath = useDispatch()

    const userName = useSelector(state => state.usersReducer.username)
    const users = useSelector(state => state.usersReducer.users)
    const chats = useSelector(state => state.chatsReducer.chats)
    const activeChat = useSelector(state => state.chatsReducer.activeChat)
    const activeId = activeChat && activeChat.id


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
        <Menu
            style={{ width: '30%' }}
            selectedKeys={[`${activeId}`]}
            defaultOpenKeys={['sub1', "sub2"]}
            mode="inline"
        >
            <SubMenu
                key="sub1"
                className='sider__chats'
                title={
                    <span>
                        <MailOutlined />
                        <span>Chats</span>
                    </span>
                }
            >
                {chats.map(item => {
                    return (
                        <Menu.Item
                            key={item.id}
                            onClick={() => handleChat(item)}
                        >
                            {item.name}
                            <div className={`${item.newMessage && 'sider__new-message'}`}></div>
                        </Menu.Item>
                    )
                })}
            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>Users</span>
                    </span>
                }
            >
                {users.map(item => {
                    if (item.name === userName) { return null }
                    return (
                        <Menu.Item
                            key={item.id}
                            onClick={() => handleName(item)}
                        >
                            {item.name}
                        </Menu.Item>
                    )
                })}
            </SubMenu>
        </Menu>
    )
}

export default Sider
