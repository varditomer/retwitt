import usersJson from '../users.json'
import { User } from "../interfaces/user.interface";
import { storageService } from './localStorage.service';
import { utilService } from './util.service';

const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

let _gUsers: User[] = _loadUsers()
let _gLoggedinUser: User | null = _loadLoggedinUser()

export const userService = {
    query,
    getUserById: getById,
    saveUser,
    removeUser,
    getLoggedinUser,
    setLoggedinUser,
    removeLoggedinUser
}

function query(): User[] {
    return JSON.parse(JSON.stringify(_gUsers))
}

function getById(userId: string): User | null {
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
    if (!_gLoggedinUser) return {
        _id: 'u000',
        createdAt: Date.now(),
        firstName: 'Guest',
        lastName: '',
        userName: '',
        about: '',
        profileImg: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        coverImg: 'https://res.cloudinary.com/retwitt/image/upload/v1675256742/cld-sample-3.jpg',
        follows: ['u101', 'u103'],
        followers: [],
        tweets: [],
        savedTweets: ['t104']
    } as User
    return JSON.parse(JSON.stringify(_gLoggedinUser))
}

function setLoggedinUser(user: User): User {
    _gLoggedinUser = JSON.parse(JSON.stringify(user))
    storageService.saveToStorage(STORAGE_KEY_USERS, _gLoggedinUser)
    return user
}

function removeLoggedinUser() {
    _gLoggedinUser = null
    storageService.saveToStorage(STORAGE_KEY_USERS, _gLoggedinUser)
    return
}

function _loadUsers(): User[] {
    let users = storageService.loadFromStorage(STORAGE_KEY_USERS)
    if (!users) users = usersJson
    return users as User[]
}

function _loadLoggedinUser(): User | null {
    let loggedinUser = storageService.loadFromStorage(STORAGE_KEY_USERS)
    if (!loggedinUser) return null
    return loggedinUser as User
}