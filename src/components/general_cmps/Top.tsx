import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { ReTwittContext } from "../../interfaces/state.interface";
import { Tweet } from "../../interfaces/tweet.interface";
import { TweetList } from "../tweet_cmps/TweetList";


export const Top: React.FC = () => { //tweets sorted by most likes
    const { tweetsToShow, loggedinUser, users }: ReTwittContext = useOutletContext()
    const [topTweets, setTopTweets] = useState<Tweet[] | null>(null)

    useEffect(() => {
        const currTopTweets = tweetsToShow.sort((tweetA, tweetB) => (tweetA.likes.length > tweetB.likes.length ? -1 : 1))
        setTopTweets(currTopTweets)
    }, [tweetsToShow])

    if (!topTweets) return <div>Loading...</div>
    return (
        <TweetList
            tweets={tweetsToShow}
            loggedinUser={loggedinUser}
            users={users}
        />
    )
}