// React / Redux
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//all the tweets replied by user
export const TweetsAndReplies: React.FC = () => {
    const { userRepliedTweets, loggedinUser, users }: UserDetailsContext = useOutletContext()

    if (!userRepliedTweets) return <div>Loading...</div>

    if (!userRepliedTweets?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://res.cloudinary.com/retwitt/image/upload/v1678556674/vb2d_tt99_220712_lsazlh.jpg" />
            <h2 className="title">No tweets to show</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! revisit later to see what's new.</h3>
        </section>
    )
    else return <TweetList
        tweets={userRepliedTweets}
        loggedinUser={loggedinUser}
        users={users}
    />
}