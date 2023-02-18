import usersJson from '../users.json'
import { User } from "../interfaces/user.interface"
import { localStorageService } from './localStorage.service'
import { sessionStorageService } from './sessionStorage.service'
import { utilService } from './util.service'

const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

let _gUsers = _loadUsers()
let _gLoggedinUser = _loadLoggedinUser()

export const userServiceLocal = {
    query,
    getUserById: getById,
    saveUser,
    removeUser,
    getLoggedinUser,
    setLoggedinUser,
    removeLoggedinUser,
}

function query(): User[] {
    return structuredClone(_gUsers)
}

function getById(userId: string): User | null {
    const user = _gUsers.find(user => user._id === userId) || null
    if (!user) return null
    return structuredClone(user)
}

function saveUser(user: User) {
    if (!user._id) {
        user._id = utilService.makeId()
        _gUsers.push(user)
    } else {
        const idx = _gUsers.findIndex(storedUser => storedUser._id === user._id)
        _gUsers.splice(idx, 1, user)
    }
    localStorageService.saveToStorage(STORAGE_KEY_USERS, _gUsers)
}

function removeUser(userId: string): string | null {
    const idx = _gUsers.findIndex(storedUser => storedUser._id === userId)
    if (idx < 0) return null
    _gUsers.splice(idx, 1)
    localStorageService.saveToStorage(STORAGE_KEY_USERS, _gUsers)
    return userId
}

function getLoggedinUser(): User | null {
    const loggedinUser: User | null = structuredClone(_gLoggedinUser)
    return loggedinUser
}

function setLoggedinUser(user: User): User {
    _gLoggedinUser = structuredClone(user)
    sessionStorageService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, _gLoggedinUser)
    return user
}

function removeLoggedinUser() {
    sessionStorageService.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function _loadUsers(): User[] {
    let users = localStorageService.loadFromStorage(STORAGE_KEY_USERS)
    if (!users) {
        users = usersJson
        localStorageService.saveToStorage(STORAGE_KEY_USERS, users)
    }
    return users as User[]
}

function _loadLoggedinUser(): User | null{
    let loggedinUser = sessionStorageService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    return loggedinUser
}