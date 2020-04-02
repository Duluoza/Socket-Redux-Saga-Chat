import { NEW_MESSAGE_TYPE, INIT_CHAT_TYPE } from '../actionTypes'

const initialState = {
    chats: [],
    activeChat: null
};

const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_TYPE:

            const newMessage = action.payload
            const UpdateChats = state.chats.find(item => item.id === newMessage.chatId)
            UpdateChats.messages.push(newMessage)
            const filterChats = state.chats.filter(item => item.id !== newMessage.chatId)
            const newChatsState = [...filterChats, UpdateChats]
            return {
                ...state,
                chats: newChatsState,
                activeChat: { ...UpdateChats}
            }

        case INIT_CHAT_TYPE: 
            const initChat = action.payload
            const newChat = state.chats.find(item => item.id === initChat.id)
            if(newChat) {
                return state
            } else {
                return {
                    ...state, 
                    chats: [...state.chats, initChat],
                    activeChat: initChat
                }
            }

        default: return state
    }
}

export default chatsReducer;