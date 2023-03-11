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

    if (!topTweets?.length) return <>
        <img alt="" className="" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
        <span className="">Save Tweets for later</span>
        <span className="">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>
    else return <TweetList
        tweets={topTweets}
        loggedinUser={loggedinUser}
        users={users}
    />
}