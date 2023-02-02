import { TWEET_STATE } from "../store/reducers/tweet.reducer";
import { USER_STATE } from "../store/reducers/user.reducer";

export interface TweetState {
    tweetModule: TWEET_STATE
}
export interface UserState {
    userModule: USER_STATE
}