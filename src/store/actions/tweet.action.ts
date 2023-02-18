import { Tweet } from "../../interfaces/tweet.interface";
import { tweetService } from "../../services/tweet.service.local";

export function loadTweets() {
    return async (dispatch: any) => {
        try {
            const tweets = tweetService.query()
            dispatch({ type: 'SET_TWEETS', payload: tweets })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function removeTweet(tweetId: string) {
    return async (dispatch: any) => {
        try {
            tweetService.removeTweet(tweetId)
            dispatch({ type: 'REMOVE_TWEET', payload: tweetId })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function addTweet(tweetToAdd: Tweet) {
    return async (dispatch: any) => {
        try {
            const tweet = await tweetService.saveTweet(tweetToAdd)
            dispatch({ type: 'ADD_TWEET', payload: tweet })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}

export function updateTweet(tweetToUpdate: Tweet) {
    return async (dispatch: any) => {
        try {
            const tweet = await tweetService.saveTweet(tweetToUpdate)
            dispatch({ type: 'UPDATE_TWEET', payload: tweet })
        } catch (err) {
            console.log(`err:`, err)
        }
    }
}


