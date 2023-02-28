// Services
import { tweetService } from "../../services/tweet.service"
// Interfaces
import { Tweet } from "../../interfaces/tweet.interface"


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
            tweetService.remove(tweetId)
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


