import { useSelector } from 'react-redux';
import { TweetState, UserState } from '../interfaces/state.interface';
import { TweetList } from '../components/tweet_cmps/TweetList';
import { AddTweet } from '../components/tweet_cmps/AddTweet';
import { TrendList } from '../components/general_cmps/TrendList';
import { WhoToFollowList } from '../components/who-to-follow_cmps/WhoToFollowList';
import { useEffect, useState } from 'react';
import { Tweet } from '../interfaces/tweet.interface';
import { User } from '../interfaces/user.interface';


export const Home: React.FC = () => {

    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)

    const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)
    const [usersToFollow, setUsersToFollow] = useState<User[] | null>(null)

    useEffect(() => {
        if (!tweets.length || !loggedinUser) return
        console.log(`tweets:`, tweets)
        const followsUsersTweets = tweets.filter(tweet => {
            console.log(`tweet:`, tweet)
            return (loggedinUser?.follows.includes(tweet.createdBy) || tweet.createdBy === loggedinUser._id)
        })
        console.log(`followsUsersTweets:`, followsUsersTweets)
        setTweetsToShow(followsUsersTweets)

    }, [tweets, loggedinUser])

    useEffect(() => {
        if (!users.length || !loggedinUser) return

        let currUsersToFollow: User[] = []

        currUsersToFollow = users.filter(user => ((!loggedinUser?.follows?.includes(user._id)) && (!user.isGuest) && (user._id !== loggedinUser._id)))
        setUsersToFollow(currUsersToFollow)
    }, [users, loggedinUser])


    // if (!loggedinUser || !users?.length || !tweetsToShow || !usersToFollow) return <div>Loading...</div>
    if (!loggedinUser || !users?.length || !usersToFollow) return <div>Loading...</div>

    return (
        <section className="home page">

            <section className="large-area">
                <AddTweet loggedinUser={loggedinUser} />
                {tweetsToShow && <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} users={users} />}
            </section>
            <div className="small-area">
                <TrendList />
                {usersToFollow && <WhoToFollowList users={usersToFollow} loggedinUser={loggedinUser} />}
            </div>

        </section>
    )
}