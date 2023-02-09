import usersJson from '../users.json'
import { User } from "../interfaces/user.interface";
import { storageService } from './localStorage.service';
import { utilService } from './util.service';

const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

let _gUsers: User[] = _loadUsers()
let _gLoggedinUser: User = _loadLoggedinUser()

export const userService = {
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
    storageService.saveToStorage(STORAGE_KEY_USERS, _gUsers)
}

function removeUser(userId: string): string | null {
    const idx = _gUsers.findIndex(storedUser => storedUser._id === userId)
    if (idx < 0) return null
    _gUsers.splice(idx, 1)
    storageService.saveToStorage(STORAGE_KEY_USERS, _gUsers)
    return userId
}

function getLoggedinUser(): User {
    return structuredClone(_gLoggedinUser)
}

function setLoggedinUser(user: User): User {
    _gLoggedinUser = structuredClone(user)
    storageService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, _gLoggedinUser)
    return user
}

function removeLoggedinUser() {
    storageService.clearStorage()
}

function _loadUsers(): User[] {
    let users = storageService.loadFromStorage(STORAGE_KEY_USERS)
    if (!users) {
        users = usersJson
        storageService.saveToStorage(STORAGE_KEY_USERS, users)
    }
    return users as User[]
}

function _loadLoggedinUser(): User {
    let loggedinUser = storageService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    if (!loggedinUser) {
        loggedinUser = structuredClone(_gUsers[0])
        storageService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, loggedinUser)
    }
    return loggedinUser as User
}