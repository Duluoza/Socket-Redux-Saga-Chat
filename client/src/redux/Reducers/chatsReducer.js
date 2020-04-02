import { NEW_MESSAGE_TYPE, INIT_CHAT_TYPE } from '../actionTypes'


const initialState = {
    list: [],
    entities: {},
    chats: [],
    activeChat: null
};

const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_TYPE:
            return {
                ...state,
                list: [...state.list, action.payload.id],
                entities: { ...state.entities, [action.payload.id]: action.payload }
            };

        case INIT_CHAT_TYPE: 
            const newChat  = action.payload
            return {
                ...state, 
                chats: [...state.chats, newChat],
                activeChat: newChat
            }

        default: return state
    }
}

export default chatsReducer;