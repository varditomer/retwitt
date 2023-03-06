import { hashtags, Tweet } from "../../interfaces/tweet.interface"


export interface TWEET_STATE {
    tweets: Tweet[]
    hashtags: hashtags
}

const TWEET_STATE: TWEET_STATE = {
    tweets: [],
    hashtags: {
        hashtags: []
    }
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
        case 'SET_HASHTAGS':
            return {
                ...state,
                hashtags: action.payload
            }
        case 'UPDATE_HASHTAGS':
            return {
                ...state,
                hashtags: action.payload
            }
        default:
            return state
    }

}
