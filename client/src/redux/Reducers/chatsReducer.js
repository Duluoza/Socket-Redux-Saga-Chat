import {
    NEW_MESSAGE_TYPE, INIT_CHAT_TYPE, START_CHAT_TYPE,
    CHANGE_ACTIVE_CHAT_TYPE, ACTIVE_USER_TYPE
} from '../actionTypes'

const initialState = {
    chats: [],
    activeChat: null,
    activeUser: null,
};

const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_TYPE:
            const UpdateChats = state.chats.map(chat => {
                if (chat.id === action.payload.chatId) {
                    chat.messages.push(action.payload)
                    chat.newMessage = action.payload.chatId === state.activeChat.id ? false : true
                }
                return chat
            })

            return {
                ...state,
                chats: [...UpdateChats],
            }

        case INIT_CHAT_TYPE:
            const initChat = action.payload
            const newChat = state.chats.find(item => item.id === initChat.id)
            if (newChat) {
                return state
            } else {
                return {
                    ...state,
                    chats: [...state.chats, initChat],
                    activeChat: initChat
                }
            }
        case START_CHAT_TYPE:
            if (action.payload.creator === state.activeUser.name) {
                return {
                    ...state,
                    chats: [...state.chats, action.payload],
                    activeChat: action.payload
                }
            } else {
                return {
                    ...state,
                    chats: [...state.chats, action.payload],
                }

            }

        case CHANGE_ACTIVE_CHAT_TYPE:
            const UpdateNewMessage = state.chats.map(chat => {
                if(chat.id === action.payload.id) chat.newMessage = false
                return chat
            })

            return {
                ...state,
                chats: [...UpdateNewMessage],
                activeChat: action.payload
            }

        case ACTIVE_USER_TYPE:
            return {
                ...state,
                activeUser: action.payload
            }

        default: return state
    }
}

export default chatsReducer;