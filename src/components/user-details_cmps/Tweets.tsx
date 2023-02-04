import { useOutletContext } from "react-router";
import { Tweet } from "../../interfaces/tweet.interface";
import { User } from "../../interfaces/user.interface";
import { TweetList } from "../tweet_cmps/TweetList";

type Props = {}

interface ReTwittContext {
    userTweets: Tweet[],
    loggedinUser: User
}

export const Tweets: React.FC<Props> = () => {
    const {userTweets, loggedinUser}: ReTwittContext = useOutletContext()
    return (
        <TweetList tweets={userTweets} loggedinUser={loggedinUser} />
    )
}