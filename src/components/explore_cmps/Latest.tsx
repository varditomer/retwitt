import { useOutletContext } from "react-router";
import { TweetList } from "../tweet_cmps/TweetList";
import { ReTwittContext } from "../user-details_cmps/Tweets";

export const Latest: React.FC = () => {
    const { tweetsToShow, loggedinUser }: ReTwittContext = useOutletContext()
    return (
        <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} />
    )
}