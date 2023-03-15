// React / Redux
import { useSelector } from "react-redux"
import { useLocation, useOutletContext } from "react-router"
// Interfaces
import { TweetState, UserDetailsContext } from "../../interfaces/state.interface"
import { Retweet, Tweet } from "../../interfaces/tweet.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//only tweets with media
export const Media: React.FC = () => {
    const { tweetsToShow, loggedinUser, users }: UserDetailsContext = useOutletContext()
    const mediaTweets = tweetsToShow?.filter((tweetOrRetweet: Tweet | Retweet) => {
        if (tweetOrRetweet.isRetweet) {
            const retweet = tweetOrRetweet as Retweet
            const retweetedTweet = useSelector((state: TweetState) => state.tweetModule.tweets.find(tweet => tweet._id === retweet.retweetedTweetId))!
            return retweetedTweet.imgUrl !== ""
        } else {
            const tweet = tweetOrRetweet as Tweet
            return tweet.imgUrl !== ""
        }
    })
    const { pathname } = useLocation()
    const page = pathname.substring(1, pathname.length).split('/')[0]


    if (!mediaTweets?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://res.cloudinary.com/retwitt/image/upload/v1678556674/vb2d_tt99_220712_lsazlh.jpg" />
            <h2 className="title">No tweets to show</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! revisit later to see what's new.</h3>
        </section>
    )

    else return <TweetList
        tweets={mediaTweets}
        loggedinUser={loggedinUser}
        users={users}
    />

}