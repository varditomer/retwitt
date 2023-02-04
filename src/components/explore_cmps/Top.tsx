import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { Tweet } from "../../interfaces/tweet.interface";
import { TweetList } from "../tweet_cmps/TweetList";
import { ReTwittContext } from "../user-details_cmps/Tweets";

export const Top: React.FC = () => {
    const { tweetsToShow, loggedinUser }: ReTwittContext = useOutletContext()
    const [topTweets, setTopTweets] = useState<Tweet[] | null>(null)

    useEffect(() => {
        const currTopTweets = tweetsToShow.sort((tweetA, tweetB) => (tweetA.likes.length > tweetB.likes.length ? -1 : 1))
        setTopTweets(currTopTweets)
    }, [tweetsToShow])

    if (!topTweets) return <div>Loading...</div>
    return (
        <TweetList tweets={topTweets} loggedinUser={loggedinUser} />
    )
}