// React / Redux
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
// Interfaces
import { INITIAL_STATE, TweetState, UserDetailsContext, UserState } from '../interfaces/state.interface'
import { Tweet, TweetsFilter } from '../interfaces/tweet.interface'
import { User } from '../interfaces/user.interface'
// Actions
import { setLoggedinUser, updateUser } from '../store/actions/user.action'
// Custom hooks
import { useClickOutside } from '../hooks/useClickOutside'
// Services
import { toast } from 'react-toastify'
// Components
import { EditProfile } from '../components/app-general_cmps/EditProfile'
import { NameAcronym } from '../components/app-general_cmps/NameAcronym'
import { SvgIcon } from '../components/app-general_cmps/SvgIcon'
import { Loader } from '../components/app-general_cmps/Loader'
import { TweetsFilters } from '../components/app-general_cmps/TweetsFilters'
import { Modal } from '../components/app-general_cmps/Modal'
import { FollowFollowersList } from '../components/follow_followers_cmps/FollowFollowersList'


export const UserDetails: React.FC = () => {

    const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()


    const [user, setUser] = useState<User | null>(null)
    const [userTweets, setUserTweets] = useState<Tweet[] | null>(null)
    const [userLikedTweets, setUserLikedTweets] = useState<Tweet[] | null>(null)
    const [userRepliedTweets, setUserRepliedTweets] = useState<Tweet[] | null>(null)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showFollowersModal, setShowFollowersModal] = useState(false)
    const [showFollowingModal, setShowFollowingModal] = useState(false)
    const [followingUsers, setFollowingUsers] = useState<User[]>([])
    const [followersUsers, setFollowersUsers] = useState<User[]>([])

    const notifyInfo = (msg: string) => toast.info(msg)
    const notifySuccess = (msg: string) => toast.success(msg)

    const tweetsFilters: TweetsFilter[] = [
        { title: 'Tweets', to: '', },
        { title: 'Tweets & replies', to: 'tweets_replies', },
        { title: 'Media', to: 'media', },
        { title: 'Likes', to: 'likes', },
    ]

    const pathnameTarget = `/home/${user?._id}`


    const toggleModal = () => {
        setShowEditProfileModal(prevShowEditProfileModal => !prevShowEditProfileModal)
    }

    const toggleFollowingModal = () => {
        setShowFollowingModal(prev => !prev)
    }

    const toggleFollowersModal = () => {
        setShowFollowersModal(prev => !prev)
    }

    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let mobileTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    let modalFollowingTriggerRef = useRef<HTMLDivElement>(null)
    let modalFollowingRef = useRef<HTMLDivElement>(null)
    let modalFollowersTriggerRef = useRef<HTMLDivElement>(null)
    let modalFollowersRef = useRef<HTMLDivElement>(null)

    useClickOutside(modalRef, () => setShowEditProfileModal(false), modalTriggerRef, mobileTriggerRef)
    useClickOutside(modalRef, () => setShowFollowingModal(false), modalFollowingTriggerRef, modalFollowingRef)
    useClickOutside(modalRef, () => setShowFollowersModal(false), modalFollowersTriggerRef, modalFollowersRef)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (!users.length) return
        const selectedUser = users.filter(user => user._id === params.id)[0]
        if (!selectedUser) navigate("/")
        setUser(selectedUser)
    }, [params.id, users])

    useEffect(() => {
        if (!user) return
        const followingUsers = users.filter(currUser => user?.follows.includes(currUser._id))
        const followersUsers = users.filter(currUser => user?.followers.includes(currUser._id))
        setFollowingUsers(followingUsers)
        setFollowersUsers(followersUsers)
    }, [user?.followers, user?.follows, user, users])


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

    const toggleFollowUser = (userToFollow: User, followUser: boolean) => {
        if (!user || !loggedinUser) return
        if (userToFollow._id === loggedinUser._id) return // extra safe mechanism

        const currLoggedinUser: User = structuredClone(loggedinUser)
        const userToFollowToUpdate: User = structuredClone(userToFollow)

        const userToFollowIdxAtLoggedinUserFollows = currLoggedinUser.follows.findIndex(followedUserId => followedUserId === userToFollow._id)
        const loggedinUserIdxAtUserToFollowFollowers = userToFollowToUpdate.followers.findIndex(followedUserId => followedUserId === currLoggedinUser._id)
        if (userToFollowIdxAtLoggedinUserFollows !== -1) currLoggedinUser.follows.splice(userToFollowIdxAtLoggedinUserFollows, 1)
        else currLoggedinUser.follows.push(userToFollowToUpdate._id)

        if (loggedinUserIdxAtUserToFollowFollowers !== -1) userToFollowToUpdate.followers.splice(loggedinUserIdxAtUserToFollowFollowers, 1)
        else userToFollowToUpdate.followers.push(currLoggedinUser._id)


        dispatch(setLoggedinUser(currLoggedinUser))
        dispatch(updateUser(currLoggedinUser))

        dispatch(updateUser(userToFollowToUpdate))
        followUser ? notifySuccess(`User - ${userToFollow.firstName} ${userToFollow.lastName} followed`) : notifyInfo(`User - ${userToFollow.firstName} ${userToFollow.firstName} unfollowed`)
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
            {showFollowingModal && <Modal modalClass="follow-followers-modal" modalRef={modalFollowingRef}>
                <FollowFollowersList loggedinUser={loggedinUser} users={followingUsers} title="following" userFullName={`${user.firstName} ${user.lastName}`} toggleFollowUser={toggleFollowUser} closeModal={() => setShowFollowingModal(false)} />
            </Modal>
            }
            {showFollowersModal && <Modal modalClass="follow-followers-modal" modalRef={modalFollowersRef}>
                <FollowFollowersList loggedinUser={loggedinUser} users={followersUsers} title="followed by" userFullName={`${user.firstName} ${user.lastName}`} toggleFollowUser={toggleFollowUser} closeModal={() => setShowFollowersModal(false)} />
            </Modal>}
            {(showEditProfileModal || showFollowingModal || showFollowersModal) &&
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
                                    <div className="user-followers" ref={modalFollowingTriggerRef} onClick={toggleFollowingModal}>
                                        <div className="user-followers-txt">
                                            <span className="emphasized">{user.follows.length}</span>
                                            <span className='harta'> Following</span>
                                        </div>
                                    </div>
                                    <div className="user-followers" ref={modalFollowersTriggerRef} onClick={toggleFollowersModal}>
                                        <div className="user-followers-txt">
                                            <span className="emphasized">{user.followers.length}</span>
                                            <span className='harta'> Followers</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(loggedinUser._id === user._id) ?
                                <div className="edit-profile-container" ref={modalTriggerRef} onClick={toggleModal}>
                                    <button className="btn-edit desktop-btn">
                                        Edit profile
                                    </button>
                                </div>
                                :
                                <button className="btn-follow desktop-btn" onClick={() => toggleFollowUser(user, !loggedinUser.follows.includes(user._id))}>
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
                            // if it's my profile - show edit profile
                            <div className="edit-profile-container" ref={mobileTriggerRef} onClick={toggleModal}>
                                <button className="btn-edit mobile-btn">
                                    Edit profile
                                </button>
                            </div>
                            :
                            // if it's someone's profile - show follow | unfollow him
                            <button className="btn-follow mobile-btn" onClick={() => toggleFollowUser(user, !loggedinUser.follows.includes(user._id))}>
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
                <TweetsFilters
                    pathnameTarget={pathnameTarget}
                    tweetsFilters={tweetsFilters}
                />
                <div className="large-area">
                    <Outlet
                        context={{
                            tweetsToShow: userTweets,
                            loggedinUser,
                            users,
                            userLikedTweets,
                            userRepliedTweets,
                            title: 'Tweet, reply or like now and check again'
                        } as UserDetailsContext}
                    />
                </div>
            </section>
        </section>
    )
}





