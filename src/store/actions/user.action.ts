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

export function setLoggedinUser() {
    return async (dispatch: any) => {
        try {
            const loggedinUser = userService.getLoggedinUser()
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: loggedinUser })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateLoggedinUser(loggedinUser: User) {
    return async (dispatch: any) => {
        try {
            userService.updateLoggedinUser(loggedinUser)
            dispatch({ type: 'UPDATE_LOGGEDIN_USER', payload: loggedinUser })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}