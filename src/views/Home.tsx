// React / Redux
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// Interfaces
import { Hashtag, Tweet } from '../interfaces/tweet.interface'
import { User } from '../interfaces/user.interface'
import { TweetState, UserState } from '../interfaces/state.interface'
// Components
import { TweetList } from '../components/tweet_cmps/TweetList'
import { AddTweet } from '../components/tweet_cmps/AddTweet'
import { TrendList } from '../components/tweet_cmps/TrendList'
import { WhoToFollowList } from '../components/who-to-follow_cmps/WhoToFollowList'
import { Loader } from '../components/app-general_cmps/Loader'


export const Home: React.FC = () => {

    const { tweets, hashtags } = useSelector((state: TweetState) => state.tweetModule)
    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)


    const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)
    const [hashtagsToShow, setHashtagsToShow] = useState<Hashtag[] | null>(null)
    const [usersToFollow, setUsersToFollow] = useState<User[] | null>(null)

    useEffect(() => {
        if (!hashtags) return
        const popularHashtags = hashtags.hashtags.splice(0, 3)
        setHashtagsToShow(popularHashtags)

    }, [hashtags])

    useEffect(() => {
        if (!tweets.length) setTweetsToShow([])
        if (!tweets.length || !loggedinUser) return

        const followsUsersTweets = tweets.filter(tweet => {
            return (loggedinUser?.follows.includes(tweet.createdBy) || tweet.createdBy === loggedinUser._id)
        })
        setTweetsToShow(followsUsersTweets)

    }, [tweets, loggedinUser])

    useEffect(() => {
        if (!users.length || !loggedinUser) return

        let currUsersToFollow: User[] = []

        currUsersToFollow = users.filter(user => ((!loggedinUser?.follows?.includes(user._id)) && (user._id !== loggedinUser._id)))
        setUsersToFollow(currUsersToFollow)
    }, [users, loggedinUser])


    if (!loggedinUser || !users?.length || !usersToFollow || !tweetsToShow || !hashtagsToShow) return (
        <section className="page loading">
            <Loader />
        </section>
    )

    return (
        <section className="home page">

            <section className="large-area">
                <AddTweet loggedinUser={loggedinUser} hashtags={hashtags} />
                <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} users={users} />
            </section>

            <section className="small-area">
                <TrendList hashtags={hashtagsToShow} />
                <WhoToFollowList users={usersToFollow} loggedinUser={loggedinUser} />
            </section>

        </section>
    )
}