import { Reply, Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface';
import { TweetPreview } from './TweetPreview';

type Props = {
    tweets: Tweet[]
    loggedinUser: User
    users: User[]
}

export const TweetList: React.FC<Props> = ({ tweets, loggedinUser, users }) => {

    const getTweetCreatedByUser = (tweet: Tweet): User => users.find(user => user._id === tweet.createdBy)!

    const getUsersForReplies = (replies: Reply[]) => users.filter(user => (replies.some(reply => reply.createdBy === user._id)))

    if (!tweets.length || !loggedinUser || !users.length) return <div>Loading...</div>


    return (
        <section className="tweet-list">
            {tweets?.map((tweet: Tweet) =>
                <TweetPreview
                    key={tweet._id}
                    tweet={tweet}
                    loggedinUser={loggedinUser}
                    tweetCreatedByUser={getTweetCreatedByUser(tweet)}
                    repliesCreatedByUsers={(tweet.replies.length) ? getUsersForReplies(tweet.replies) : undefined}
                />
            )}
        </section>
    )
}