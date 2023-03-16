// React / Redux
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//tweets sorted by createdAt
export const Tweets: React.FC = () => {

    const { tweetsToShow, loggedinUser, users, title }: UserDetailsContext = useOutletContext()

    if (!tweetsToShow?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
            <h2 className="title">No tweets to show 😢</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! {title} later to see what's new.</h3>
        </section>
    )

    else return <TweetList
        tweets={tweetsToShow}
        loggedinUser={loggedinUser}
        users={users}
    />
}