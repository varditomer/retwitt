import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { ReTwittContext } from "../../interfaces/state.interface";
import { Tweet } from "../../interfaces/tweet.interface";
import { TweetList } from "../tweet_cmps/TweetList";


export const Top: React.FC = () => { //tweets sorted by most likes
    const { tweetsToShow, loggedinUser, users }: ReTwittContext = useOutletContext()
    const [topTweets, setTopTweets] = useState<Tweet[] | null>(null)

    useEffect(() => {
        const tweets: Tweet[] = JSON.parse(JSON.stringify(tweetsToShow)) //sort changes the original arr so breaking the pointer is required
        
        const currTopTweets = tweets?.sort((tweetA, tweetB) => (tweetA.likes.length > tweetB.likes.length ? -1 : 1))
        setTopTweets(currTopTweets)
    }, [tweetsToShow])

    if(!topTweets) return <div>Loading...</div>

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