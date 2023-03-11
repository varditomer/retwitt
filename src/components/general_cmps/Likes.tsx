// React / Redux
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//tweets sorted by most likes
export const Likes: React.FC = () => { 
    const { userLikedTweets, loggedinUser, users }: UserDetailsContext = useOutletContext()

    if (!userLikedTweets) return <div>Loading...</div>

    if (!userLikedTweets?.length) return <>
        <img alt="" className="" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
        <span className="">Save Tweets for later</span>
        <span className="">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>
    else return <TweetList
        tweets={userLikedTweets}
        loggedinUser={loggedinUser}
        users={users}
    />
}