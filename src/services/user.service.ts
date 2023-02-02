import usersJson from '../users.json'
import { User } from "../interfaces/user.interface";
import { storageService } from './localStorage.service';
import { utilService } from './util.service';

const USERS_STORAGE_KEY = 'users'
let _gUsers: User[] = _loadUsers()
let _gLoggedinUser: User | null = _loadLoggedinUser()
console.log(`_gUsers:`, _gUsers)

export const userService = {
    query,
    getUserById,
    saveUser,
    removeUser,
    getLoggedinUser,
    removeLoggedinUser,
    updateLoggedinUser
}

function query(): User[] {
    return JSON.parse(JSON.stringify(_gUsers))
}

function getUserById(userId: string): User | null {
    const user = _gUsers.find(user => user._id === userId) || null
    if (!user) return null
    return JSON.parse(JSON.stringify(user))
}

function saveUser(user: User) {
    if (!user._id) {
        user._id = utilService.makeId()
        _gUsers.push(user)
    } else {
        const idx = _gUsers.findIndex(storedUser => storedUser._id === user._id)
        _gUsers.splice(idx, 1, user)
    }
    storageService.saveToStorage(USERS_STORAGE_KEY, _gUsers)
}

function removeUser(userId: string): string | null {
    const idx = _gUsers.findIndex(storedUser => storedUser._id === userId)
    if (idx < 0) return null
    _gUsers.splice(idx, 1)
    storageService.saveToStorage(USERS_STORAGE_KEY, _gUsers)
    return userId
}

function getLoggedinUser(): User | null {
    if (!_gLoggedinUser) return null
    return JSON.parse(JSON.stringify(_gLoggedinUser))
}

function updateLoggedinUser(user: User): User {
    _gLoggedinUser = JSON.parse(JSON.stringify(user))
    storageService.saveToStorage(USERS_STORAGE_KEY, _gLoggedinUser)
    return user
}

function removeLoggedinUser() {
    _gLoggedinUser = null
    storageService.saveToStorage(USERS_STORAGE_KEY, _gLoggedinUser)
    return
}

function _loadUsers(): User[] {
    let users = storageService.loadFromStorage(USERS_STORAGE_KEY)
    if (!users) users = usersJson
    return users as User[]
}

function _loadLoggedinUser(): User | null {
    let loggedinUser = storageService.loadFromStorage(USERS_STORAGE_KEY)
    if (!loggedinUser) return null
    return loggedinUser as User
}