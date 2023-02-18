import { User, UserCredentials } from "../interfaces/user.interface"
import { httpService } from "./http.service"
// import { localStorageService } from './localStorage.service'
import { sessionStorageService } from './sessionStorage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER = 'user'

let _gLoggedinUser = _loadLoggedinUser()


export const userService = {
    getUsers,
    update,
    remove,
    signup,
    login,
    logout,
    getLoggedinUser,
    setLoggedinUser,
    getEmptyUserCredentials,
}

async function getUsers() {
    const users: User[] = await httpService.get(STORAGE_KEY_USER)
    return users
}

async function update(user: User) {
    const updatedUser: User = await httpService.put(`user/${user._id}`)
    return updatedUser
}

async function remove(userId: string) {
    return await httpService.delete(`user/${userId}`)
}

async function signup(credentials: UserCredentials) {
    const user: User = await httpService.post('auth/signup', credentials)
    // setLoggedinUser(user)
    return user
}

async function login(userCred: any) {
    const user = await httpService.post('auth/login', userCred)
    console.log(`user:`, user)
    if (user) {
        // setLoggedinUser(user)
        return user
    } else {
        console.log(`blabla:`,)
    }
}

async function logout() {
    sessionStorageService.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    _gLoggedinUser = null
    return await httpService.post('auth/logout')
}

function getLoggedinUser(): User | null {
    const loggedinUser: User | null = structuredClone(_gLoggedinUser)
    return loggedinUser
}

function setLoggedinUser(user: User) {
    sessionStorageService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    _gLoggedinUser = user
}

function getEmptyUserCredentials(): UserCredentials {
    return {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    }
}

function _loadLoggedinUser(): User | null {
    const user: User | null = sessionStorageService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    console.log(`user:`, user)
    return user

}