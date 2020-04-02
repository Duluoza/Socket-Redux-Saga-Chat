import { LOGIN_TYPE, LOGOUT_TYPE, ADD_USER_TYPE, REMOVE_USER_TYPE } from '../actionTypes'


const initialState = {
    username: null,
    users: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_TYPE:
            return { ...state, username: action.payload }

        case LOGOUT_TYPE:
            return { ...state, username: null }

        case ADD_USER_TYPE:
            return { ...state, users: action.payload }

        case REMOVE_USER_TYPE:
            const newState = state.users.filter(u => u !== action.payload)
            return {...state, users: newState}

        default: return state
    }
}

export default usersReducer;