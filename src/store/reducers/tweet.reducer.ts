import { Tweet } from "../../interfaces/tweet.interface"


export interface TWEET_STATE {
    tweets: Tweet[]
}

const TWEET_STATE = {
    tweets: []
}

type Action = {
    type: string,
    payload: any
}

export function tweetReducer(state = TWEET_STATE, action: Action) {
    switch (action.type) {
        case 'SET_TWEETS':
            return {
                ...state,
                tweets: action.payload
            }
        case 'ADD_TWEET':
            return {
                ...state,
                tweets: [action.payload, ...state.tweets]
            }
        case 'REMOVE_TWEET':
            return {
                ...state,
                tweets: state.tweets.filter((tweet: Tweet) => tweet._id !== action.payload)
            }
        case 'UPDATE_TWEET':
            return {
                ...state,
                tweets: state.tweets.map((tweet: Tweet) => (tweet._id === action.payload._id) ? action.payload : tweet)
            }
        default:
            return state
    }

}
