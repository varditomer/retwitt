
// Services
import { httpService } from "./http.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"
// Interface
import { Tweet, Reply, Retweet } from "../interfaces/tweet.interface"

const STORAGE_KEY = 'tweet'

export const tweetService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyTweet,
    getEmptyReply,
    retweet
}

async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(tweetId: string) {
    return httpService.get(`tweet/${tweetId}`)
}

async function add(tweetToAdd: Tweet) {
    const addedTweet: Tweet = await httpService.post('tweet', tweetToAdd)
    return addedTweet
}

async function update(tweet: Tweet) {
    const updatedTweet: Tweet = await httpService.put(`tweet/${tweet._id}`, tweet)
    return updatedTweet
}

async function retweet(retweetedTweetId: string) {
    const newRetweet = getNewRetweet(retweetedTweetId)
    const addedRetweet: Retweet = await httpService.post('tweet/retweet', newRetweet)
    return addedRetweet
}

async function remove(tweetId: string) {
    return await httpService.delete(`tweet/${tweetId}`)
}

function getEmptyTweet(): Tweet {
    return {
        createdBy: userService.getLoggedinUser()!._id,
        imgUrl: '',
        isEveryOneCanReply: true,
        isRetweet: false,
        content: '',

        hashtags: [],
        replies: [],
        retweetedBy: [],
        savedBy: [],
        likes: [],
    }
}

function getEmptyReply(): Reply {
    return {
        _id: utilService.makeId(),
        createdAt: new Date().getTime(),
        createdBy: userService.getLoggedinUser()!._id,
        content: '',
        imgUrl: '',
        likes: [],
    }
}

function getNewRetweet(retweetedTweetId: string): Retweet {
    return {
        createdBy: userService.getLoggedinUser()!._id,
        retweetedTweetId,
        isRetweet: true
    }
}