import { useLocation, useOutletContext } from "react-router";
import { ReTwittContext } from "../../interfaces/state.interface";
import { TweetList } from "../tweet_cmps/TweetList";

export const Media: React.FC = () => { //only tweets with media
    const { tweetsToShow, loggedinUser, users }: ReTwittContext = useOutletContext()

    const mediaTweets = tweetsToShow.filter(tweet => tweet.imgUrl !== "")
    const { pathname } = useLocation()
    const page = pathname.substring(1, pathname.length).split('/')[0]


    if (mediaTweets.length) return (
        <TweetList
            tweets={tweetsToShow}
            loggedinUser={loggedinUser}
            users={users}
        />
    )
    else return <>
        <img alt="" className="" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png"/>
        <span className="">Save Tweets for later</span>
        <span className="">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>
}