// Interfaces
import { Reply, Retweet, Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface'
// Components
import { TweetPreview } from './TweetPreview'


type Props = {
    tweets: Tweet[]
    loggedinUser: User
    users: User[]
}

export const TweetList: React.FC<Props> = ({ tweets, loggedinUser, users }) => {
    const getCreatedByUser = (createdBy: string): User => users.find(user => user._id === createdBy)!

    const getUsersForReplies = (replies: Reply[]) => users.filter(user => (replies.some(reply => reply.createdBy === user._id)))

    const getRetweetedTweet = (retweetedTweetId: string) => {
        return tweets.find(tweet => tweet._id === retweetedTweetId)!
    }

    if (!tweets || !loggedinUser || !users) return <div>Loading...</div>



    return (
        <section className="tweet-list">
            {tweets?.map((tweetOrRetweet: Tweet | Retweet) => {

                if (tweetOrRetweet.isRetweet) {
                    const retweet = tweetOrRetweet as Retweet
                    const retweetedTweet: Tweet = getRetweetedTweet(retweet.retweetedTweetId)
                    return <TweetPreview
                        key={retweet._id}
                        tweet={retweetedTweet}
                        loggedinUser={loggedinUser}
                        tweetCreatedByUser={getCreatedByUser(retweetedTweet.createdBy)}
                        repliesCreatedByUsers={(retweetedTweet.replies.length) ? getUsersForReplies(retweetedTweet.replies) : undefined}
                        retweet={retweet}
                        retweetCreatedByUser={getCreatedByUser(retweet.createdBy)}
                    />
                } else {
                    const tweet = tweetOrRetweet as Tweet
                    return <TweetPreview
                        key={tweet._id}
                        tweet={tweet}
                        loggedinUser={loggedinUser}
                        tweetCreatedByUser={getCreatedByUser(tweet.createdBy)}
                        repliesCreatedByUsers={(tweet.replies.length) ? getUsersForReplies(tweet.replies) : undefined}
                    />
                }
            }

            )}
        </section>
    )
}