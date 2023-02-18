import { Tweet } from "../interfaces/tweet.interface"
import { httpService } from "./http.service"
import { userService } from "./user.service"

import { utilService } from "./util.service"

const STORAGE_KEY = 'tweet'

export const tweetService = {
    query,
    getById,
    save,
    getEmptyTweet
}

async function query() {
    const tweets = httpService.get(STORAGE_KEY)
    return tweets
}

function getById(tweetId: string) {
    return httpService.delete(`tweet/${tweetId}`)
}

async function save(tweet: Tweet) {
    let savedTweet: Tweet
    if(tweet._id) savedTweet = await httpService.put(`tweet/${tweet._id}`, tweet)
    else {
        savedTweet = await httpService.post('tweet', tweet)
    }
    return savedTweet
}

function getEmptyTweet(): Tweet {
    return {
        createdAt: Date.now(),
        createdBy: userService.getLoggedinUser()!._id,
        imgUrl: '',
        isEveryOneCanReply: true,
        retweet: false,
        hashtags: [],
        content: '',
        replies: [],
        reTweeted: [],
        savedBy: [],
        likes: [],
    } as Tweet
}