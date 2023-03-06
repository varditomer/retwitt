// Services
import { tweetService } from "../../services/tweet.service"
// Interfaces
import { hashtag, hashtags, Tweet } from "../../interfaces/tweet.interface"


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
            console.log(`tweetId:`, tweetId)
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
            return retweet._id
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function loadHashtags() {
    return async (dispatch: any) => {
        try {
            const hashtags: hashtags = await tweetService.queryHashtags()
            console.log(`hashtags:`, hashtags)
            dispatch({ type: 'SET_HASHTAGS', payload: hashtags })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeHashtags(hashtagsToRemove: string[], currHashtags: hashtags) {
    return async (dispatch: any) => {
        try {
            const newHashtags = currHashtags.hashtags.map(hashtagObj => {
                if (hashtagsToRemove.includes(hashtagObj.key)) {
                    return {
                        key: hashtagObj.key,
                        occurrences: hashtagObj.occurrences - 1
                    } as hashtag
                }
                else return hashtagObj
            }).filter(hashtag => hashtag.occurrences !== 0)
            const updatedHashtags: hashtags = {
                _id: currHashtags._id,
                hashtags: newHashtags
            }
            updatedHashtags.hashtags.sort((hashtagA, hashtagB) => hashtagB.occurrences - hashtagA.occurrences)
            dispatch({ type: 'UPDATE_HASHTAGS', payload: updatedHashtags })
            await tweetService.updateHashtags(updatedHashtags)

        } catch (err) {
            console.log(`err:`, err)
        }
    }
}


export function updateHashtags(newHashtags: string[], currHashtags: hashtags) {
    return async (dispatch: any) => {
        try {
            const updatedHashtags: hashtags = {
                _id: currHashtags._id,
                hashtags: currHashtags.hashtags.map(hashtagObj => {
                    const idx = newHashtags.findIndex(hashtag => hashtag === hashtagObj.key)
                    if (idx !== -1) {
                        newHashtags.splice(idx, 1)
                        return { key: hashtagObj.key, occurrences: hashtagObj.occurrences + 1 }
                    }
                    else return hashtagObj
                })
            }
            if (newHashtags.length) {
                newHashtags.forEach(hashtag => {
                    updatedHashtags.hashtags.push({ key: hashtag, occurrences: 1 })
                })
            }
            updatedHashtags.hashtags.sort((hashtagA, hashtagB) => hashtagB.occurrences - hashtagA.occurrences)
            dispatch({ type: 'UPDATE_HASHTAGS', payload: updatedHashtags })
            await tweetService.updateHashtags(updatedHashtags)

        } catch (err) {
            console.log(`err:`, err)
        }
    }


}


