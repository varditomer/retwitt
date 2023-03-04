// Services
import { tweetService } from "../../services/tweet.service"
// Interfaces
import { ObjMap, Tweet } from "../../interfaces/tweet.interface"
import { TweetState } from "../../interfaces/state.interface"
import { useSelector } from "react-redux"


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



//hashtagsCounts = [{'sport', 1}, {'sad',3}]
//newHashtags = ['fun']
//newHashtagsCounts = [{'sport', 2}, {'sad',3}, {'fun',1} ]
//sortedNewHashtagsCounts = [{'sad',3}, {'sport', 2}, {'fun',1}]
export function updateHashtags(newHashtags: string[], hashtagsCounts: ObjMap[]) {
    return async (dispatch: any) => {
        try {
            console.log(`newHashtags:`, newHashtags)
            console.log(`hashtagsCounts:`, hashtagsCounts)
            let newHashtagsCounts = hashtagsCounts.map(hashtagObj => {
                const idx = newHashtags.findIndex(hashtag => hashtag === hashtagObj.key)
                if (idx !== -1) {
                    newHashtags.splice(idx, 1)
                    return { key: hashtagObj.key, occurrences: hashtagObj.occurrences + 1 }
                }
                else return hashtagObj
            })
            if (newHashtags.length) {
                newHashtags.forEach(hashtag => {
                    newHashtagsCounts.push({ key: hashtag, occurrences: 1 })
                })
            }
            console.log(`newHashtagsCounts:`, newHashtagsCounts)
            newHashtagsCounts.sort((hashtagA, hashtagB) => hashtagB.occurrences - hashtagA.occurrences)
            console.log(`newHashtagsCounts:`, newHashtagsCounts)
            dispatch({ type: 'UPDATE_HASHTAGS', payload: newHashtagsCounts })
        } catch (err) {
            console.log(`err:`, err)
        }
    }


}


