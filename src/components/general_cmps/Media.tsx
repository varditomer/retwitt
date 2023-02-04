import { useLocation, useOutletContext } from "react-router";
import { TweetList } from "../tweet_cmps/TweetList";
import { ReTwittContext } from "../user-details_cmps/Tweets";

export const Media: React.FC = () => {
    const { tweetsToShow, loggedinUser }: ReTwittContext = useOutletContext()
    console.log(`tweetsToShow:`, tweetsToShow)

    const mediaTweets = tweetsToShow.filter(tweet => tweet.imgUrl !== "")
    const { pathname } = useLocation()
    console.log(`pathname:`, pathname)
    const page = pathname.substring(1, pathname.length).split('/')[0]


    if (mediaTweets.length) {
        return (
            <TweetList tweets={mediaTweets} loggedinUser={loggedinUser} />
        )
    }
    else if (page === 'bookmark') {
        return <>
        <img alt="" draggable="true" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" className="css-9pa8cd" />
        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Save Tweets for later</span>
        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>
    }
    else return <div>No tweets yet</div>
}