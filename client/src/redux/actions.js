import { LOGIN_TYPE, LOGOUT_TYPE, ADD_USER_TYPE, 
    REMOVE_USER_TYPE, NEW_MESSAGE_TYPE, SEND_MESSAGE_TYPE, INIT_CHAT_TYPE } from './actionTypes'


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

export const sendMessageAction = (message) => {
    return {
        type: SEND_MESSAGE_TYPE,
        payload: message
    }
}

export const initChatAction = (chat) => { 
    return { 
        type: INIT_CHAT_TYPE,
        payload: chat
    }
}


