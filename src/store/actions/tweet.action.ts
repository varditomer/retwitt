// Interfaces
import { Hashtag, Hashtags, Tweet } from "../../interfaces/tweet.interface"
// Services
import { tweetService } from "../../services/tweet.service"
import { toast } from 'react-toastify'

const notifySuccess = (msg: string) => toast.success(msg)
const notifyInfo = (msg: string) => toast.info(msg)

export function loadTweets() {
    return async (dispatch: any) => {
        try {
            const tweets = await tweetService.query()
            dispatch({ type: 'SET_TWEETS', payload: tweets })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeTweet(tweetId: string) {
    return async (dispatch: any) => {
        try {
            await tweetService.remove(tweetId)
            dispatch({ type: 'REMOVE_TWEET', payload: tweetId })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function addTweet(tweetToAdd: Tweet) {
    return async (dispatch: any) => {
        try {
            const tweet = await tweetService.add(tweetToAdd)
            dispatch({ type: 'ADD_TWEET', payload: tweet })
            notifySuccess('Tweet added')
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateTweet(tweetToUpdate: Tweet, tweetLastState: Tweet) {
    return async (dispatch: any) => {
        try {
            // Optimistic update: 1st updating store, if backend update fail - restore to tweet's last state
            dispatch({ type: 'UPDATE_TWEET', payload: tweetToUpdate })
            await tweetService.update(tweetToUpdate)
        } catch (err) {
            dispatch({ type: 'UPDATE_TWEET', payload: tweetLastState })
            console.log(`err:`, err)
        }
    }
}

export function addRetweet(retweetedTweetId: string) {
    return async (dispatch: any) => {
        try {
            const retweet = await tweetService.retweet(retweetedTweetId)
            dispatch({ type: 'ADD_TWEET', payload: retweet })
            notifySuccess('Tweet Retweeted')
            return retweet._id
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function loadHashtags() {
    return async (dispatch: any) => {
        try {
            const hashtags: Hashtags = await tweetService.queryHashtags()
            dispatch({ type: 'SET_HASHTAGS', payload: hashtags })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeHashtags(hashtagsToRemove: string[], currHashtags: Hashtags) {
    return async (dispatch: any) => {
        try {
            const newHashtags = currHashtags.hashtagsList.map(hashtagObj => {
                if (hashtagsToRemove.includes(hashtagObj.key)) {
                    return {
                        key: hashtagObj.key,
                        occurrences: hashtagObj.occurrences - 1
                    } as Hashtag
                }
                else return hashtagObj
            }).filter(hashtag => hashtag.occurrences !== 0)
            const updatedHashtags: Hashtags = {
                _id: currHashtags._id,
                hashtagsList: newHashtags
            }
            updatedHashtags.hashtagsList.sort((hashtagA, hashtagB) => hashtagB.occurrences - hashtagA.occurrences)
            dispatch({ type: 'UPDATE_HASHTAGS', payload: updatedHashtags })
            await tweetService.updateHashtags(updatedHashtags)

        } catch (err) {
            console.log(`err:`, err)
        }
    }
}


export function updateHashtags(newHashtags: string[], currHashtags: Hashtags) {
    return async (dispatch: any) => {
        try {
            const updatedHashtags ={_id:currHashtags._id, hashtagsList: [] as Hashtag[]} as Hashtags
            const addedHashtags = newHashtags.reduce((acc, hashtag)=>
            {
                const hashtagObj = currHashtags.hashtagsList.find(h=>h.key===hashtag) || {key:hashtag,occurrences:0}
                hashtagObj.occurrences++
                acc.push(hashtagObj)
                return acc
            },[]as Hashtag[])
            addedHashtags.push(...currHashtags.hashtagsList.filter(h => !addedHashtags.find(_=>h.key===_.key)))
            updatedHashtags.hashtagsList = addedHashtags
            updatedHashtags.hashtagsList.sort((hashtagA, hashtagB) => hashtagB.occurrences - hashtagA.occurrences)
            dispatch({ type: 'UPDATE_HASHTAGS', payload: structuredClone(updatedHashtags) })
            await tweetService.updateHashtags(updatedHashtags)

        } catch (err) {
            console.log(`err:`, err)
        }
    }
}


