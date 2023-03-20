// React / Redux
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
// Interfaces
import { INITIAL_STATE, TweetState } from '../../interfaces/state.interface'
import { Retweet, Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface'
// Actions
import { removeTweet, updateTweet, addRetweet, removeHashtags } from '../../store/actions/tweet.action'
import { setLoggedinUser, updateUser } from '../../store/actions/user.action'
// Custom hooks
import { useClickOutside } from '../../hooks/useClickOutside'
// Services
import { utilService } from '../../services/util.service'
import { toast } from 'react-toastify'
// Components
import { SvgIcon } from '../app-general_cmps/SvgIcon'
import { Modal } from '../app-general_cmps/Modal'
import { NameAcronym } from '../app-general_cmps/NameAcronym'
import { AddReply } from './reply_cmps/AddReply'
import { ReplyList } from './reply_cmps/ReplytList'




type Props = {
    tweet: Tweet
    loggedinUser: User
    tweetCreatedByUser: User,
    repliesCreatedByUsers?: User[],
    retweet?: Retweet,
    retweetCreatedByUser?: User,
}

export const TweetPreview: React.FC<Props> = ({ tweet, loggedinUser, tweetCreatedByUser, repliesCreatedByUsers, retweet, retweetCreatedByUser }) => {

    const childInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const hashtags = useSelector((state: TweetState) => state.tweetModule.hashtags)

    const notifyInfo = (msg: string) => toast.info(msg)
    const notifySuccess = (msg: string) => toast.success(msg)

    const [showTweetOptModal, setShowTweetOptModal] = useState(false)

    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, () => setShowTweetOptModal(false), modalTriggerRef)


    const toggleModal = () => {
        setShowTweetOptModal(prevShowTweetOptModal => !prevShowTweetOptModal)
    }


    const navigate = useNavigate()

    const navigateTo = () => {
        navigate(`/home/${tweet.createdBy}`)
    }
    const isRetweetClicked = () => {
        const retweetedByIdx = tweet.retweetedBy.findIndex(retweetedBy => retweetedBy?.retweeterId === loggedinUser._id)
        return (retweetedByIdx !== -1)
    }
    const isLikeClicked = () => {
        return tweet.likes.includes(loggedinUser._id)
    }

    const isBookmarked = () => {
        return loggedinUser.savedTweets.includes(tweet._id!)
    }

    const onUpdateTweet = async (tweetToUpdate: Tweet) => {
        const tweetLastState: Tweet = structuredClone(tweet)
        await dispatch(updateTweet(tweetToUpdate, tweetLastState))
    }


    const toggleLikeTweet = () => {
        const tweetToUpdate: Tweet = structuredClone(tweet)
        const idx = tweetToUpdate.likes.findIndex(likedById => likedById === loggedinUser._id)
        if (idx !== -1) tweetToUpdate.likes.splice(idx, 1)
        else tweetToUpdate.likes.push(structuredClone(loggedinUser._id))
        onUpdateTweet(tweetToUpdate)
    }

    const toggleBookmarkTweet = () => {
        if (!tweet._id) return
        const userToUpdate: User = structuredClone(loggedinUser)
        const tweetIdx = loggedinUser.savedTweets.findIndex(tweetId => tweetId === tweet._id)
        if (tweetIdx !== -1) {
            userToUpdate.savedTweets.splice(tweetIdx, 1)
            notifyInfo('Tweet unsaved')
        }
        else {
            userToUpdate.savedTweets.push(structuredClone(tweet._id))
            notifyInfo('Tweet saved')
        }
        dispatch(updateUser(userToUpdate))
        dispatch(setLoggedinUser(userToUpdate))

        const tweetToUpdate: Tweet = structuredClone(tweet)
        const userIdx = tweetToUpdate.savedBy.findIndex(savedById => savedById === loggedinUser._id)
        if (userIdx !== -1) tweetToUpdate.savedBy.splice(userIdx, 1)
        else tweetToUpdate.savedBy.push(loggedinUser._id)
        onUpdateTweet(tweetToUpdate)
    }

    const toggleLikeReply = (replyId: string) => {
        const tweetToUpdate: Tweet = structuredClone(tweet)
        const replyIdx = tweetToUpdate.replies.findIndex(reply => reply._id === replyId)!
        const likeIdx = tweetToUpdate.replies[replyIdx].likes.findIndex(likedById => likedById === loggedinUser._id)
        if (likeIdx !== -1) tweetToUpdate.replies[replyIdx].likes.splice(likeIdx, 1)
        else tweetToUpdate.replies[replyIdx].likes.push(structuredClone(loggedinUser._id))
        onUpdateTweet(tweetToUpdate)
    }

    const onRemoveTweet = () => {
        if (!tweet._id || tweet.createdBy !== loggedinUser._id) return
        setShowTweetOptModal(false)

        if (tweet.retweetedBy.length) {
            tweet.retweetedBy.forEach(retweetedBy => {
                dispatch(removeTweet(retweetedBy?.retweetId!))
            })
        }

        const matches = tweet.content.match(/#(\w+)/g)
        const hashtagsToRemove = matches?.map(match => match.toLowerCase().slice(1))
        if (hashtagsToRemove) {
            dispatch(removeHashtags(hashtagsToRemove, hashtags))

        }
        dispatch(removeTweet(tweet._id))
        notifySuccess('Tweet removed')
    }

    const onRetweet = async () => {
        const tweetToUpdate = structuredClone(tweet)

        const retweetedByIdx = tweetToUpdate.retweetedBy.findIndex(retweetedBy => retweetedBy?.retweeterId === loggedinUser._id)
        if (retweetedByIdx !== -1) {
            await dispatch(removeTweet(tweetToUpdate.retweetedBy[retweetedByIdx]?.retweetId!))
            tweetToUpdate.retweetedBy.splice(retweetedByIdx, 1)
            notifyInfo('Retweet deleted')
            return onUpdateTweet(tweetToUpdate)
        }

        // Optimistic tweet update
        tweetToUpdate.retweetedBy.push({ retweeterId: loggedinUser._id, retweetId: '' })
        await onUpdateTweet(tweetToUpdate)

        const retweetId = await dispatch(addRetweet(tweetToUpdate._id!))
        // Update tweet again with the retweetId that was created on the backend
        if (retweetId) {
            const retweetedByIdx = tweetToUpdate.retweetedBy.findIndex(retweetedBy => retweetedBy?.retweeterId === loggedinUser._id)
            tweetToUpdate.retweetedBy[retweetedByIdx]!.retweetId = retweetId
            onUpdateTweet(tweetToUpdate)
        }

    }

    const toggleFollowUser = (userToFollow: User, followUser: boolean) => {
        setShowTweetOptModal(false)

        const loggedinUserToUpdate: User = structuredClone(loggedinUser)
        const userToFollowToUpdate: User = structuredClone(userToFollow)

        const userToFollowIdxAtLoggedinUserFollows = loggedinUserToUpdate.follows.findIndex(followedUserId => followedUserId === userToFollow._id)
        const loggedinUserIdxAtUserToFollowFollowers = userToFollowToUpdate.followers.findIndex(followedUserId => followedUserId === loggedinUserToUpdate._id)

        if (userToFollowIdxAtLoggedinUserFollows !== -1) loggedinUserToUpdate.follows.splice(userToFollowIdxAtLoggedinUserFollows, 1)
        else loggedinUserToUpdate.follows.push(userToFollowToUpdate._id)

        if (loggedinUserIdxAtUserToFollowFollowers !== -1) userToFollowToUpdate.followers.splice(loggedinUserIdxAtUserToFollowFollowers, 1)
        else userToFollowToUpdate.followers.push(userToFollowToUpdate._id)

        dispatch(setLoggedinUser(loggedinUserToUpdate))
        dispatch(updateUser(loggedinUserToUpdate))

        dispatch(updateUser(userToFollowToUpdate))
        followUser? notifySuccess ('User followed') : notifyInfo ('User unfollowed')
    }

    const removeReply = (replyId: string) => {
        const tweetToUpdate: Tweet = structuredClone(tweet)
        const replyIdx = tweetToUpdate.replies.findIndex(reply => reply._id === replyId)!
        tweetToUpdate.replies.splice(replyIdx, 1)
        onUpdateTweet(tweetToUpdate)
        notifyInfo('Reply removed')
    }

    const toggleIsEveryOneCanReplySettings = (isEveryOneCanReply: boolean) => {
        setShowTweetOptModal(false)
        const tweetToUpdate: Tweet = structuredClone(tweet)
        if (isEveryOneCanReply) tweetToUpdate.isEveryOneCanReply = true
        else tweetToUpdate.isEveryOneCanReply = false
        onUpdateTweet(tweetToUpdate)
    }



    if (!tweet || !tweet._id || !tweet.createdAt || !loggedinUser || !tweetCreatedByUser) return <div>Loading...</div>

    return (
        <section>
            {retweet && <div className="retweet-head">
                <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#828282", fill: "#828282" }} />
                <span>{retweetCreatedByUser?.firstName} {retweetCreatedByUser?.lastName} Retweeted</span>
            </div>}
            <article className="tweet card">
                <div className="card-header tweet-header">
                    {tweetCreatedByUser.profileImg ?
                        <img className="user-img" src={tweetCreatedByUser.profileImg} alt="user image" onClick={() => navigateTo()} /> :
                        <NameAcronym firstName={tweetCreatedByUser.firstName} lastName={tweetCreatedByUser.lastName} userId={tweetCreatedByUser._id} />
                    }
                    <div className="user-info">
                        <span className="user-name" onClick={() => navigateTo()}>{tweetCreatedByUser?.firstName} {tweetCreatedByUser?.lastName}</span>
                        <span className="sub-info">{utilService.timeStampConverter(tweet.createdAt)}</span>
                    </div>

                    <div className="options-container" onClick={toggleModal} ref={modalTriggerRef}>
                        <SvgIcon iconName="options" wrapperStyle="options-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    </div>

                    {showTweetOptModal ?
                        <Modal modalClass='tweet-modal' modalRef={modalRef}>
                            {(tweet.createdBy === loggedinUser._id) ?
                                <div className="reply-set-container">
                                    <span className="reply-set">
                                        Toggle who can reply:
                                    </span>

                                    {(tweet.isEveryOneCanReply) ?
                                        <div className="modal-item" onClick={() => toggleIsEveryOneCanReplySettings(false)}>
                                            <SvgIcon iconName="people" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                            <span className="card-item-txt">People you follow</span>
                                        </div>
                                        :
                                        <div className="modal-item" onClick={() => toggleIsEveryOneCanReplySettings(true)}>
                                            <SvgIcon iconName="earth" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                            <span className="card-item-txt">Every one can reply</span>
                                        </div>
                                    }
                                </div>
                                :
                                ''
                            }

                            <div className="modal-item">
                                <SvgIcon iconName="copy_txt" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                <span className="card-item-txt">Copy tweet text</span>
                            </div>
                            {(tweet.createdBy === loggedinUser._id) ?
                                <div className={`modal-item negative`} onClick={onRemoveTweet}>
                                    <SvgIcon iconName="remove" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                    <span className="card-item-txt">Delete tweet</span>
                                </div>
                                :
                                (loggedinUser.follows.includes(tweet.createdBy)) ?
                                    <div className={`modal-item negative`} onClick={() => toggleFollowUser(tweetCreatedByUser, false)}>
                                        <SvgIcon iconName="unfollow_big" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                        <span className="card-item-txt">Unfollow</span>
                                    </div>
                                    :
                                    <div className={`modal-item positive`} onClick={() => toggleFollowUser(tweetCreatedByUser, true)}>
                                        <SvgIcon iconName="follow_big" wrapperStyle="card-item-icon" svgProp={{ stroke: "#1da1f2", fill: "#1da1f2" }} />
                                        <span className="card-item-txt">Follow</span>
                                    </div>
                            }
                        </Modal>
                        :
                        ''
                    }

                </div>
                <p className="tweet-txt">
                    {tweet.content}
                </p>
                {tweet.imgUrl && <img className="tweet-img" src={tweet.imgUrl} alt="" />}

                <div className="expose-info">
                    {tweet.likes.length ? <span> {tweet.likes.length} Likes</span> : ''}
                    {tweet.replies.length ? <span> {tweet.replies.length} Replies</span> : ''}
                    {tweet.retweetedBy.length ? <span> {tweet.retweetedBy.length} Retweets</span> : ''}
                    {tweet.savedBy.length ? <span> {tweet.savedBy.length} Saved</span> : ''}
                </div>

                <div className="action-btns">
                    <button className='action-btn' onClick={() => childInputRef.current?.focus()}>
                        <SvgIcon iconName="comment" wrapperStyle="comment" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        <span className="action-type">Comment</span>
                    </button>
                    <button className={`action-btn retweet ${(isRetweetClicked()) ? 'active' : ''}`} onClick={onRetweet}>
                        <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        <span className="action-type">Retweet</span>
                    </button>
                    <button className={`action-btn like ${(isLikeClicked()) ? 'active' : ''}`} onClick={toggleLikeTweet}>
                        <SvgIcon iconName="like" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        <span className="action-type">Like</span>
                    </button>
                    <button className={`action-btn bookmark ${(isBookmarked()) ? 'active' : ''}`} onClick={toggleBookmarkTweet}>
                        <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        <span className="action-type">Save</span>
                    </button>
                </div>

                <AddReply loggedinUser={loggedinUser} childInputRef={childInputRef} tweetToEdit={tweet} onUpdateTweet={onUpdateTweet} tweetCreatedByUser={tweetCreatedByUser} />

                {(tweet.replies.length && repliesCreatedByUsers) ?
                    <ReplyList replies={tweet.replies} repliesCreatedByUsers={repliesCreatedByUsers} loggedinUser={loggedinUser} toggleLikeReply={toggleLikeReply} removeReply={removeReply} toggleFollowUser={toggleFollowUser} />
                    :
                    ''
                }

            </article>
        </section>
    )
}