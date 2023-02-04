import { Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface';
import { TweetPreview } from './TweetPreview';

type Props = {
    tweets: Tweet[]
    loggedinUser: User
}

export const TweetList: React.FC<Props> = ({tweets, loggedinUser}) => {

    return (
        <section className="tweet-list">
            {tweets?.map((tweet: Tweet) =>
                <TweetPreview
                    key={tweet._id}
                    tweet={tweet}
                    loggedinUser={loggedinUser}
                />
            )}
        </section>
    )
}