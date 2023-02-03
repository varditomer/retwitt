import { Tweet } from '../../interfaces/tweet.interface'
import { TweetPreview } from './TweetPreview';

type Props = {
    tweets: Tweet[]
}

export const TweetList: React.FC<Props> = ({tweets}) => {

    return (
        <section className="tweet-list">
            {tweets?.map((tweet: Tweet) =>
                <TweetPreview
                    key={tweet._id}
                    tweet={tweet}
                />
            )}
        </section>
    )
}