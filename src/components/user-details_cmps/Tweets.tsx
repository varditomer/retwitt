import { useOutletContext } from "react-router";
import { Tweet } from "../../interfaces/tweet.interface";
import { User } from "../../interfaces/user.interface";
import { TweetList } from "../tweet_cmps/TweetList";

type Props = {}

export interface ReTwittContext {
    tweetsToShow: Tweet[],
    loggedinUser: User
}

export const Tweets: React.FC<Props> = () => {
    const {tweetsToShow, loggedinUser}: ReTwittContext = useOutletContext()
    return (
        <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} />
    )
}