// React / Redux
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
import { Tweet } from "../../interfaces/tweet.interface"
// Components
import { TweetList } from "../tweet_cmps/TweetList"


//tweets sorted by most likes
export const Top: React.FC = () => {
    const { tweetsToShow, loggedinUser, users }: UserDetailsContext = useOutletContext()
    const [topTweets, setTopTweets] = useState<Tweet[] | null>(null)

    useEffect(() => {
        //meet the new deep-clone method - structured clone - already widely supported by most of the browsers
        const tweets: Tweet[] = structuredClone(tweetsToShow) //sort changes the original arr so breaking the pointer is required.

        const currTopTweets = tweets?.sort((tweetA, tweetB) => (tweetA.likes.length > tweetB.likes.length ? -1 : 1))
        setTopTweets(currTopTweets)
    }, [tweetsToShow])

    if (!topTweets) return <div>Loading...</div>

    if (!topTweets?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://res.cloudinary.com/retwitt/image/upload/v1678556674/vb2d_tt99_220712_lsazlh.jpg" />
            <h2 className="title">No tweets to show</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! revisit later to see what's new.</h3>
        </section>
    )
    else return <TweetList
        tweets={topTweets}
        loggedinUser={loggedinUser}
        users={users}
    />
}