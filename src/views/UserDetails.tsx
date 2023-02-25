import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NameAcronym } from '../components/NameAcronym';
import { INITIAL_STATE, TweetState, UserState } from '../interfaces/state.interface';
import { Tweet } from '../interfaces/tweet.interface';
import { User } from '../interfaces/user.interface';
import { setLoggedinUser, updateUser } from '../store/actions/user.action';
import SvgIcon from '../SvgIcon';

type Props = {}

export const UserDetails: React.FC<Props> = () => {

    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()


    const [user, setUser] = useState<User | null>(null)
    const [userTweets, setUserTweets] = useState<Tweet[] | null>(null)
    const [userLikedTweets, setUserLikedTweets] = useState<Tweet[] | null>(null)
    const [userRepliedTweets, setUserRepliedTweets] = useState<Tweet[] | null>(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (!users.length) return
        const selectedUser = users.filter(user => user._id === params.id)[0]
        if (!selectedUser) navigate("/")
        setUser(selectedUser)
    }, [params.id, users])

    useEffect(() => {
        if (!tweets || !user) return

        const selectedUserTweets = tweets.filter(tweet => tweet.createdBy === user._id)
        setUserTweets(selectedUserTweets)

        const selectedUserLikedTweets = tweets.filter(tweet => tweet.likes.includes(user._id!))
        setUserLikedTweets(selectedUserLikedTweets)

        const tweetsToFilter: Tweet[] = structuredClone(tweets)

        // This code filter & make shallow copy (breaks only tweets pointers but not inner replies pointers) 
        // of tweets by tweets that the selected user replied on them.
        const selectedUserRepliedTweets = tweetsToFilter.filter(tweet => tweet.replies.some(reply => reply.createdBy === user._id))
        // But next I want to remove others users's replies on them,
        // but because filter method only makes a shallow copy
        // this manipulation will filter others users's replies from the original tweets.
        // So i'm working from the start on structredClone of the original tweets
        selectedUserRepliedTweets.forEach(tweet => tweet.replies = tweet.replies.filter(reply => {
            return reply.createdBy === user._id
        }))

        setUserRepliedTweets(selectedUserRepliedTweets)

    }, [params.id, tweets, user])

    const toggleFollowUser = (user: User, loggedinUser: User) => {
        const userToUpdate: User = structuredClone(loggedinUser)
        const idx = loggedinUser.follows.findIndex(followedUserId => followedUserId === user._id)
        if (idx !== -1) userToUpdate.follows.splice(idx, 1)
        else userToUpdate.follows.push(user._id!)
        dispatch(updateUser(userToUpdate))
        dispatch(setLoggedinUser(userToUpdate))
    }

    if (!userTweets || !users || !user || !loggedinUser) return <div>Loading...</div>

    return (
        <section className="user-details">
            {user.coverImg ?
                <img src={user.coverImg} alt="" className="cover-img" />
                :
                <div className="cover-img not-set">
                    <SvgIcon iconName='twitter_logo' wrapperStyle="twitter" svgProp={{ stroke: "white", fill: "white" }} />
                    Coming soon...
                </div>
            }
            <section className="user-profile page">
                <div className="card-header card">
                    {user.profileImg ?
                        <img className="user-img" src={user.profileImg} alt="user image" />
                        :
                        <div className='user-img'>
                            <NameAcronym firstName={user.firstName} lastName={user.lastName} userId={user._id} />
                        </div>

                    }
                    <div className="user-info-container">
                        <div className="user-statistics">
                            <span className="user-name">{user.firstName} {user.lastName}</span>
                            <div className="user-info">
                                <span className="user-followers"><span className="emphasized">30k</span> Following </span>
                                <span className="user-followers"><span className="emphasized">230k</span> Followers</span>
                            </div>
                            {loggedinUser._id !== user._id &&
                                <div className="btn-container">
                                    <button className="btn-follow desktop-btn" onClick={() => toggleFollowUser(user, loggedinUser)}>
                                        <SvgIcon iconName={(loggedinUser.follows.includes(user._id)) ? 'unfollow' : 'follow'} wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                        {loggedinUser.follows.includes(user._id) ?
                                            <span>Unfollow</span>
                                            :
                                            <span>Follow</span>
                                        }
                                    </button>
                                </div>
                            }
                        </div>
                        {user.about && <p className="about">
                            {user.about}
                        </p>}
                        <button className="btn-follow mobile-btn">
                            <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                            <span>Follow</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="main-content page">
                <div className="small-area">
                    <section className="tweets-filter card">
                        <ul role='list'>
                            <li>
                                <div className="border"></div>
                                <NavLink to='tweets'>
                                    <span className="filter-title">Tweets</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='tweets_replies'>
                                    <span className="filter-title">Tweets & replies</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='media'>
                                    <span className="filter-title">Media</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='likes'>
                                    <span className="filter-title">Likes</span>
                                </NavLink>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="large-area">
                    <Outlet
                        context={{
                            tweetsToShow: userTweets,
                            loggedinUser,
                            users,
                            userLikedTweets,
                            userRepliedTweets
                        }}
                    />
                </div>
            </section>
        </section>
    )
}
