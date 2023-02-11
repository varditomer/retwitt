import { User } from "../../interfaces/user.interface"
import { userService } from "../../services/user.service"

export function loadUsers() {
    return async (dispatch: any) => {
        try {
            const users = userService.query()
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

export function setLoggedinUser(loggedinUser: User) {
    return async (dispatch: any) => {
        try {
            userService.setLoggedinUser(loggedinUser)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: loggedinUser })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeLoggedinUser() {
    return async (dispatch: any) => {
        try {
            userService.removeLoggedinUser()
            dispatch({ type: 'REMOVE_LOGGEDIN_USER'})
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateUser(user: User) {
    return async (dispatch: any) => {
        try {
            userService.saveUser(user)
            dispatch({ type: 'UPDATE_USER', payload: user })
        } catch (err) {
            console.log(`err:`, err)
        }
    }

}