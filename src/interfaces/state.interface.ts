import { TWEET_STATE } from "../store/reducers/tweet.reducer";
import { USER_STATE } from "../store/reducers/user.reducer";
import { Tweet } from "./tweet.interface";
import { User } from "./user.interface";

export interface TweetState {
    tweetModule: TWEET_STATE
}

export interface UserState {
    userModule: USER_STATE
}

export interface INITIAL_STATE {
    tweets?: Tweet[],
    users?: User[],
    loggedinUser?: User
}

export interface ReTwittContext {
    tweetsToShow: Tweet[],
    loggedinUser: User,
    users: User[],
    userLikedTweets?: Tweet[],
    userRepliedTweets?: Tweet[]
  }