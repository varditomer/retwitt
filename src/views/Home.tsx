import { useSelector } from 'react-redux';
import { TweetState, UserState } from '../interfaces/state.interface';
import { TweetList } from '../components/tweet_cmps/TweetList';
import { AddTweet } from '../components/tweet_cmps/AddTweet';
import { TrendList } from '../components/tweet_cmps/TrendList';
import { WhoToFollowList } from '../components/who-to-follow_cmps/WhoToFollowList';
import { useEffect, useState } from 'react';
import { Tweet } from '../interfaces/tweet.interface';
import { User } from '../interfaces/user.interface';
import SvgIcon from '../SvgIcon';


export const Home: React.FC = () => {

    const { tweets, hashtags } = useSelector((state: TweetState) => state.tweetModule)
    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)


    const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)
    const [usersToFollow, setUsersToFollow] = useState<User[] | null>(null)
    const [showSmallArea, setShowSmallArea] = useState(false)

    useEffect(() => {
        if (!!tweets.length) setTweetsToShow(null)
        if (!tweets.length || !loggedinUser) return
        const followsUsersTweets = tweets.filter(tweet => {
            return (loggedinUser?.follows.includes(tweet.createdBy) || tweet.createdBy === loggedinUser._id)
        })
        setTweetsToShow(followsUsersTweets)

    }, [tweets, loggedinUser])

    useEffect(() => {
        if (!users.length || !loggedinUser) return

        let currUsersToFollow: User[] = []

        currUsersToFollow = users.filter(user => ((!loggedinUser?.follows?.includes(user._id)) && (!user.isGuest) && (user._id !== loggedinUser._id)))
        setUsersToFollow(currUsersToFollow)
    }, [users, loggedinUser])

    const toggleShowSmallArea = () => {
        setShowSmallArea(prevShowSmallArea => !prevShowSmallArea)
    }


    if (!loggedinUser || !users?.length || !usersToFollow) return <div>Loading...</div>
    return (
        <section className="home page">



            <section className="large-area">
                <AddTweet loggedinUser={loggedinUser} hashtags={hashtags} />
                {tweetsToShow && <TweetList tweets={tweetsToShow} loggedinUser={loggedinUser} users={users} />}
            </section>
            <div className={`small-area ${showSmallArea ? 'show' : ''}`}>
                <TrendList hashtags={hashtags.hashtags} />
                {usersToFollow && <WhoToFollowList users={usersToFollow} loggedinUser={loggedinUser} />}

                <button className={`toggle-show-small-area ${showSmallArea ? 'rotate' : ''}`} onClick={toggleShowSmallArea}>
                        <SvgIcon iconName='arrow_circle_right' wrapperStyle="arrow" svgProp={{ stroke: "white", fill: "white" }} />
                </button>
            </div>

        </section>
    )
}