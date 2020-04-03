import { LOGIN_TYPE, LOGOUT_TYPE, ADD_USER_TYPE, 
    REMOVE_USER_TYPE, NEW_MESSAGE_TYPE, SEND_MESSAGE_TYPE, 
    INIT_CHAT_TYPE, CREATE_CHAT_TYPE, START_CHAT_TYPE, CHANGE_ACTIVE_CHAT_TYPE } from './actionTypes'


export const loginAction = (name) => {
    return {
        type: LOGIN_TYPE,
        payload: name
    }
}

export const logoutAction = (name) => {
    return {
        type: LOGOUT_TYPE,
        payload: name
    }
}

export const addUserAction = (users) => {
    return {
        type: ADD_USER_TYPE,
        payload: users
    }
}

export const removeUserAction = (name) => {
    return {
        type: REMOVE_USER_TYPE,
        payload: name
    }
}

export const newMessageAction = (message) => {
    return {
        type: NEW_MESSAGE_TYPE,
        payload: message
    }
}

export const sendMessageAction = (message, chatId) => {
    return {
        type: SEND_MESSAGE_TYPE,
        payload: {message, chatId}
    }
}

export const initChatAction = (chat) => { 
    return { 
        type: INIT_CHAT_TYPE,
        payload: chat
    }
}

export const createChatAction = (data) => { 
    return { 
        type: CREATE_CHAT_TYPE,
        payload: data
    }
}

export const startChatAction = (data) => { 
    return { 
        type: START_CHAT_TYPE,
        payload: data
    }
}

export const changeActiveChatAction = (chat) => { 
    return { 
        type: CHANGE_ACTIVE_CHAT_TYPE,
        payload: chat
    }
}



