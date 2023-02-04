import { useSelector } from 'react-redux';
import { TweetState, UserState } from '../interfaces/state.interface';
import { TweetList } from '../components/tweet_cmps/TweetList';
import SvgIcon from '../SvgIcon';
import { AddTweet } from '../components/tweet_cmps/AddTweet';
import { TrendList } from '../components/general_cmps/TrendList';
import { WhoToFollowList } from '../components/who-to-follow_cmps/WhoToFollowList';
import { useEffect, useState } from 'react';
import { Tweet } from '../interfaces/tweet.interface';


export const Home: React.FC = () => {

    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
    const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)

    useEffect(() => {
        if (!tweets.length || !loggedinUser) return
        const currTweetsToShow = tweets.filter(tweet => loggedinUser?.follows.includes(tweet.createdBy._id))
        setTweetsToShow(currTweetsToShow)
    }, [tweets, loggedinUser])


    if (!tweetsToShow?.length || !users || !loggedinUser) return <div>Loading...</div>

    return (
        <section className="home page">

            <section className="large-area">
                <AddTweet loggedinUser={loggedinUser} />
                <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} />
            </section>
            <div className="small-area">
                <TrendList />
                <WhoToFollowList users={users} />
            </div>
        </section>
    )
}