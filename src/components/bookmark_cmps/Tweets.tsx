
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

    const { tweetsToShow, loggedinUser }: ReTwittContext = useOutletContext()
    

    if (!tweetsToShow) return <div>Loading...</div>

    else if (!tweetsToShow.length) return <>
        <img alt="" draggable="true" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" className="css-9pa8cd" />
        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Save Tweets for later</span>
        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>

    return (
        <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} />
    )

}