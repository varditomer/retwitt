// Interfaces
import { User, UserCredentials } from "../../interfaces/user.interface"
// Services
import { userService } from "../../services/user.service"


export function loadUsers() {
    return async (dispatch: any) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', payload: users })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function loadLoggedinUser() {
    return async (dispatch: any) => {
        try {
            const loggedinUser = userService.getLoggedinUser()
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: loggedinUser })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function signup(credentials: UserCredentials) {
    return async (dispatch: any) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: 'ADD_USER', payload: user })
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
            return user
        } catch (err) {
            console.log(`err:`, err)
            throw err
        }
    }
}

export function login(credentials: UserCredentials) {
    return async (dispatch: any) => {
        try {
            const user = await userService.login(credentials)
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
        } catch (err) {
            console.log(`err:`, err)
            throw err
        }
    }
}

export function logout() {
    return (dispatch: any) => {
        try {
            userService.logout()
            dispatch({ type: 'REMOVE_LOGGEDIN_USER' })

        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function setLoggedinUser(user: User) {
    return (dispatch: any) => {
        try {
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateUser(user: User) {
    return async (dispatch: any) => {
        try {
            dispatch({ type: 'UPDATE_USER', payload: user })
            await userService.update(user)
        } catch (err) {
            console.log(`err:`, err)
        }
    }

}