
// Interface
import { Tweet, Reply, Retweet, Hashtags } from "../interfaces/tweet.interface"
// Services
import { httpService } from "./http.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"


const STORAGE_KEY = 'tweet'

export const tweetService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyTweet,
    getEmptyReply,
    retweet,
    queryHashtags,
    updateHashtags
}

async function query() {
    return httpService.get(STORAGE_KEY)
}

function getById(tweetId: string) {
    return httpService.get(`${STORAGE_KEY}/${tweetId}`)
}

async function add(tweetToAdd: Tweet) {
    const addedTweet: Tweet = await httpService.post(`${STORAGE_KEY}`, tweetToAdd)
    return addedTweet
}

async function update(tweet: Tweet) {
    const updatedTweet: Tweet = await httpService.put(`${STORAGE_KEY}/${tweet._id}`, tweet)
    return updatedTweet
}

async function retweet(retweetedTweetId: string) {
    const newRetweet = getNewRetweet(retweetedTweetId)
    const addedRetweet: Retweet = await httpService.post(`${STORAGE_KEY}/retweet`, newRetweet)
    return addedRetweet
}


async function remove(tweetId: string) {
    return await httpService.delete(`${STORAGE_KEY}/${tweetId}`)
}

async function queryHashtags() {
    const hashtags = await httpService.get(`${STORAGE_KEY}/hashtag`)
    return hashtags
}

async function updateHashtags(hashtagsToUpdate: Hashtags) {
    return await httpService.put(`${STORAGE_KEY}/hashtag`, hashtagsToUpdate)
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