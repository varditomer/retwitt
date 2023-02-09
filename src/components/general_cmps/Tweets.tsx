import { useOutletContext } from "react-router";
import { ReTwittContext } from "../../interfaces/state.interface";
import { TweetList } from "../tweet_cmps/TweetList";

export const Tweets: React.FC = () => { //tweets sorted by createdAt
    
    const { tweetsToShow, loggedinUser, users }: ReTwittContext = useOutletContext()

   if (!tweetsToShow?.length) return <>
        <img alt="" className="" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
        <span className="">Save Tweets for later</span>
        <span className="">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>

    else return <TweetList
        tweets={tweetsToShow}
        loggedinUser={loggedinUser}
        users={users}
    />
}