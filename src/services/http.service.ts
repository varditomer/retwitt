import Axios from "axios";
import { hashtags, Retweet, Tweet } from "../interfaces/tweet.interface";
import { User, UserCredentials } from "../interfaces/user.interface";

const BASE_URL: string = (process.env.NODE_ENV === 'production') ?
    '/api/'
    : '//localhost:3030/api/'

const axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data: Tweet | hashtags | User | string | null = null) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: Tweet | Retweet | UserCredentials | string | null = null) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: Tweet | hashtags | User | string | null = null) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: Tweet | User | string | null = null) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint: string, method = 'GET', data: Tweet | hashtags | Retweet | User | UserCredentials | string | null = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err: any) {
        console.log(`Had Issues while trying to ${method} on the backend, endpoint: ${endpoint}, with data:`, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            // window.location.assign('/')
            // Depends on routing startegy - hash or history
            // window.location.assign('/#/login')
            // window.location.assign('/login')
            // router.push('/login')
        }
        throw err
    }
}