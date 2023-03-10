import tweetsJson from '../tweets.json'
import { Reply, Tweet } from '../interfaces/tweet.interface'
import { localStorageService } from './localStorage.service'
import { utilService } from './util.service'
import { userServiceLocal } from './user.service.local'

const TWEETS_STORAGE_KEY = 'tweets'
let _gTweets: Tweet[] = _loadTweets()

export const tweetService = {
    query,
    getTweetById,
    saveTweet,
    removeTweet,
    getEmptyTweet,
    getEmptyReply
}


function query(): Tweet[] {
    return structuredClone(_gTweets)
}

function getTweetById(tweetId: string): Tweet | null {
    const tweet = _gTweets.find(tweet => tweet._id === tweetId) || null
    if (!tweet) return null
    return JSON.parse(JSON.stringify(tweet))
}

function saveTweet(tweet: Tweet) {
    if (!tweet._id) {
        tweet._id = utilService.makeId()
        _gTweets.unshift(tweet)
    } else {
        const idx = _gTweets.findIndex(storedTweet => storedTweet._id === tweet._id)
        _gTweets.splice(idx, 1, tweet)
    }
    localStorageService.saveToStorage(TWEETS_STORAGE_KEY, _gTweets)
    return Promise.resolve(tweet)
}

function removeTweet(tweetId: string) {
    const idx = _gTweets.findIndex(storedTweet => storedTweet._id === tweetId)
    if (idx < 0) return
    _gTweets.splice(idx, 1)
    localStorageService.saveToStorage(TWEETS_STORAGE_KEY, _gTweets)
}

function _loadTweets(): Tweet[] {
    let tweets = localStorageService.loadFromStorage(TWEETS_STORAGE_KEY)
    if (!tweets) {
        tweets = tweetsJson
        localStorageService.saveToStorage(TWEETS_STORAGE_KEY, tweets)
    }
    return tweets as Tweet[]
}

function getEmptyTweet(): Tweet {
    return {
        _id: '',
        createdAt: Date.now(),
        createdBy: userServiceLocal.getLoggedinUser()!._id,
        imgUrl: '',
        isEveryOneCanReply: true,
        isRetweet: false,
        hashtags: [],
        content: '',
        replies: [],
        retweetedBy: [],
        savedBy: [],
        likes: [],
    }
}

function getEmptyReply(): Reply {
    return {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        createdBy: userServiceLocal.getLoggedinUser()!._id,
        content: '',
        imgUrl: '',
        likes: [],
    }
}