import { LOGIN_TYPE, LOGOUT_TYPE, ADD_USER_TYPE, REMOVE_USER_TYPE, NEW_MESSAGE_TYPE } from './actionTypes'


const initialState = {
    username: null,
    users: [],
    list: [],
    entities: {}
};

const reducer = (state = initialState, action) => {
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

        case NEW_MESSAGE_TYPE:
            return {
                ...state,
                list: [...state.list, action.payload.id],
                entities: { ...state.entities, [action.payload.id]: action.payload }
            };

        default: return state
    }
}

export default reducer;