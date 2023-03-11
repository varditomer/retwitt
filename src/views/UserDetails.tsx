// React / Redux
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
// Interfaces
import { INITIAL_STATE, TweetState, UserState } from '../interfaces/state.interface'
import { Tweet } from '../interfaces/tweet.interface'
import { User } from '../interfaces/user.interface'
// Actions
import { setLoggedinUser, updateUser } from '../store/actions/user.action'
// Custom hooks
import { useClickOutside } from '../hooks/useClickOutside'
// Components
import { EditProfile } from '../components/app-general_cmps/EditProfile'
import { NameAcronym } from '../components/app-general_cmps/NameAcronym'
import { SvgIcon } from '../components/app-general_cmps/SvgIcon'
import { Loader } from '../components/app-general_cmps/Loader'


export const UserDetails: React.FC = () => {

    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()


    const [user, setUser] = useState<User | null>(null)
    const [userTweets, setUserTweets] = useState<Tweet[] | null>(null)
    const [userLikedTweets, setUserLikedTweets] = useState<Tweet[] | null>(null)
    const [userRepliedTweets, setUserRepliedTweets] = useState<Tweet[] | null>(null)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)

    const [expandMore, setExpandMore] = useState(false)
    const location = useLocation()
    const userPath = `/home/${user?._id}`

    const toggleExpandMore = () => {
        setExpandMore(prev => !prev)
    }

    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, modalTriggerRef, () => setShowEditProfileModal(false))

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

        const selectedUserLikedTweets = tweets.filter(tweet => tweet.likes?.includes(user._id!))
        setUserLikedTweets(selectedUserLikedTweets)

        const tweetsToFilter: Tweet[] = structuredClone(tweets)

        // This code filter & make shallow copy (breaks only tweets pointers but not inner replies pointers) 
        // of tweets by tweets that the selected user replied on them.
        const selectedUserRepliedTweets = tweetsToFilter.filter(tweet => tweet.replies?.some(reply => reply.createdBy === user._id))
        // But next I want to remove others users's replies on them,
        // but because filter method only makes a shallow copy
        // this manipulation will filter others users's replies from the original tweets.
        // So i'm working from the start on structredClone of the original tweets
        selectedUserRepliedTweets.forEach(tweet => tweet.replies = tweet.replies?.filter(reply => {
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



    const toggleModal = () => {
        setShowEditProfileModal(prevShowEditProfileModal => !prevShowEditProfileModal)
    }

    if (!userTweets || !users || !user || !loggedinUser) return (
        <section className="page loading">
            <Loader />
        </section>
    )

    return (
        <section className={`user-details ${showEditProfileModal ? 'blur' : ''}`}>
            {showEditProfileModal &&
                <EditProfile user={user} toggleModal={toggleModal} modalRef={modalRef} />
            }
            {showEditProfileModal &&
                <div className="black-screen"></div>
            }

            {user.coverImg ?
                <img src={user.coverImg} alt="" className="cover-img" />
                :
                <div className="cover-img not-set">
                    <SvgIcon iconName='twitter_logo' wrapperStyle="twitter" svgProp={{ stroke: "white", fill: "white" }} />
                    Coming soon...
                </div>
            }

            <section className="user-profile">

                <article className="user-profile-card card">

                    {user.profileImg ?
                        <img className="user-img" src={user.profileImg} alt="user image" />
                        :
                        <div className='user-img'>
                            <NameAcronym firstName={user.firstName} lastName={user.lastName} userId={user._id} />
                        </div>
                    }

                    <div className="user-profile-details">

                        <div className="head-line">
                            <div className="user-info">
                                <span className="user-name">{user.firstName} {user.lastName}</span>
                                <div className="user-statistics">
                                    <span className="user-followers"><span className="emphasized">{user.follows.length}</span> Following </span>
                                    <span className="user-followers"><span className="emphasized">{user.followers.length}</span> Followers</span>
                                </div>
                            </div>
                            {(loggedinUser._id === user._id) ?
                                <div className="edit-profile-container" ref={modalTriggerRef}>
                                    <button className="btn-edit desktop-btn" onClick={toggleModal}>
                                        Edit profile
                                    </button>
                                </div>
                                :
                                <button className="btn-follow desktop-btn" onClick={() => toggleFollowUser(user, loggedinUser)}>
                                    <SvgIcon iconName={(loggedinUser.follows.includes(user._id)) ? 'unfollow' : 'follow'} wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                    {loggedinUser.follows.includes(user._id) ?
                                        <span>Unfollow</span>
                                        :
                                        <span>Follow</span>
                                    }
                                </button>
                            }
                        </div>
                        {user.about &&
                            <p className="about">
                                {user.about}
                            </p>
                        }
                        {(loggedinUser._id === user._id) ?
                            <button className="btn-edit mobile-btn" onClick={toggleModal}>
                                Edit profile
                            </button>
                            :
                            <button className="btn-follow mobile-btn" onClick={() => toggleFollowUser(user, loggedinUser)}>
                                <SvgIcon iconName={(loggedinUser.follows.includes(user._id)) ? 'unfollow' : 'follow'} wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                {loggedinUser.follows.includes(user._id) ?
                                    <span>Unfollow</span>
                                    :
                                    <span>Follow</span>
                                }
                            </button>
                        }
                    </div>

                </article>

            </section>

            <section className="main-content">
                <div className={`small-area ${expandMore ? 'expand' : ''}`}>
                    <section className="tweets-filter card">
                        <ul role='list'>
                            <li className={`first-link ${location.pathname === userPath ? 'first-link-active' : ''}`}>
                                <div className="border"></div>
                                <NavLink to=''>
                                    <div className="head">
                                        <span className="filter-title">Tweets</span>
                                        <SvgIcon iconName='expand_more_without_fill' wrapperStyle="expand-more" svgProp={{ stroke: "black", fill: "black" }} handleClick={toggleExpandMore} />
                                    </div>
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
