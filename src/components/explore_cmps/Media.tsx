import { useOutletContext } from "react-router";
import { TweetList } from "../tweet_cmps/TweetList";
import { ReTwittContext } from "../user-details_cmps/Tweets";

export const Media: React.FC = () => {
    const {tweetsToShow, loggedinUser}: ReTwittContext = useOutletContext()
    const mediaTweets = tweetsToShow.filter(tweet=>tweet.imgUrl!=="")
    console.log(`mediaTweets:`, mediaTweets)
    return (
        <TweetList tweets={mediaTweets} loggedinUser={loggedinUser} />
    )
}