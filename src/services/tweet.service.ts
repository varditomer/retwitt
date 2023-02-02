import tweetsJson from '../tweets.json'
import { Tweet } from '../interfaces/tweet.interface'
import { storageService } from './localStorage.service'
import { utilService } from './util.service'

const TWEETS_STORAGE_KEY = 'tweets'
let _gTweets: Tweet[] = _loadTweets()
console.log(`_gTweets:`, _gTweets)

export const tweetService = {
    query,
    getTweetById,
    saveTweet,
    removeTweet
}


function query(): Tweet[] {
    return JSON.parse(JSON.stringify(_gTweets))
}

function getTweetById(tweetId: string): Tweet | null {
    const tweet = _gTweets.find(tweet => tweet._id === tweetId) || null
    if(!tweet) return null
    return JSON.parse(JSON.stringify(tweet))
}

function saveTweet(tweet: Tweet) {
    if (!tweet._id) {
        tweet._id = utilService.makeId()
        _gTweets.push(tweet)
    } else {
        const idx = _gTweets.findIndex(storedTweet => storedTweet._id === tweet._id)
        _gTweets.splice(idx, 1, tweet)
    }
    storageService.saveToStorage(TWEETS_STORAGE_KEY, _gTweets)
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
    if (!tweets) tweets = tweetsJson
    return tweets as Tweet[]
}