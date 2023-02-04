import { User } from "../../interfaces/user.interface";

export interface USER_STATE {
    users: User[],
    loggedinUser: User | null
}

const USER_STATE = {
    users: [],
    loggedinUser: null
}

type Action = {
    type: string,
    payload: any
}

export function userReducer(state = USER_STATE, action: Action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case 'GET_USER_BY_ID': // to get loggedinUser's related users details by id --> if not related --> will get it from the service
            const user = state.users.filter((user: User)=>user._id === action.payload)
            console.log(`user:`, user)
            return {
                ...user
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter((user: User) => user._id !== action.payload)
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((user: User) => (user._id === action.payload._id) ? action.payload : user)
            }
        case 'SET_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: action.payload
            }
        case 'UPDATE_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: action.payload
            }
        case 'REMOVE_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: null
            }
        default:
            return state
    }

}