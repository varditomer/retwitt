// React / Redux
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//tweets sorted by most likes
export const Likes: React.FC = () => { 
    const { userLikedTweets, loggedinUser, users, title }: UserDetailsContext = useOutletContext()

    if (!userLikedTweets) return <div>Loading...</div>

    if (!userLikedTweets?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
            <h2 className="title">No tweets to show 😢</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! {title} revisit later to see what's new.</h3>
        </section>
    )
    else return <TweetList
        tweets={userLikedTweets}
        loggedinUser={loggedinUser}
        users={users}
    />
}