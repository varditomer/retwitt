import tweetsJson from '../tweets.json'
import { Reply, Tweet } from '../interfaces/tweet.interface'
import { storageService } from './localStorage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

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
    storageService.saveToStorage(TWEETS_STORAGE_KEY, _gTweets)
    return Promise.resolve(tweet)
}

function removeTweet(tweetId: string): string | null {
    const idx = _gTweets.findIndex(storedTweet => storedTweet._id === tweetId)
    if (idx < 0) return null
    _gTweets.splice(idx, 1)
    storageService.saveToStorage(TWEETS_STORAGE_KEY, _gTweets)
    return tweetId
}

function _loadTweets(): Tweet[] {
    let tweets = storageService.loadFromStorage(TWEETS_STORAGE_KEY)
    if (!tweets) {
        tweets = tweetsJson
        storageService.saveToStorage(TWEETS_STORAGE_KEY, tweets)
    }
    return tweets as Tweet[]
}

function getEmptyTweet(): Tweet {
    return {
        createdAt: Date.now(),
        createdBy: 'u101',
        imgUrl: '',
        public: true,
        retweet: false,
        hashtags: [],
        content: '',
        replies: [],
        reTweeted: [],
        savedBy: [],
        likes: [],
    } as Tweet
}

function getEmptyReply(): Reply {
    return {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        createdBy: userService.getLoggedinUser()._id,
        content: '',
        imgUrl: '',
        likes: [],
    }
}