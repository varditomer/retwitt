import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { INITIAL_STATE } from '../../interfaces/state.interface'
import { Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface'
import { utilService } from '../../services/util.service'
import { updateTweet } from '../../store/actions/tweet.action'
import { setLoggedinUser, updateUser } from '../../store/actions/user.action'
import SvgIcon from '../../SvgIcon'
import { AddReply } from './reply_cmps/AddReply'
import { ReplyList } from './reply_cmps/ReplytList'


type Props = {
    tweet: Tweet
    loggedinUser: User
    tweetCreatedByUser: User,
    repliesCreatedByUsers?: User[]
}

export const TweetPreview: React.FC<Props> = ({ tweet, loggedinUser, tweetCreatedByUser, repliesCreatedByUsers }) => {

    const childInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()


    const navigate = useNavigate()

    const navigateTo = () => {
        navigate(`/home/${tweet.createdBy}/tweets`)
    }

    const isLikeClicked = () => {
        return tweet.likes.includes(loggedinUser._id)
    }

    const isBookmarked = () => {
        return loggedinUser.savedTweets.includes(tweet._id!)
    }


    const toggleLikeTweet = () => {
        const tweetToUpdate: Tweet = structuredClone(tweet)
        const idx = tweetToUpdate.likes.findIndex(likedById => likedById === loggedinUser._id)
        if (idx !== -1) tweetToUpdate.likes.splice(idx, 1)
        else tweetToUpdate.likes.push(structuredClone(loggedinUser._id))
        dispatch(updateTweet(tweetToUpdate))
    }

    const toggleBookmarkTweet = () => {
        const userToUpdate: User = structuredClone(loggedinUser)
        const tweetIdx = loggedinUser.savedTweets.findIndex(tweetId => tweetId === tweet._id)
        if (tweetIdx !== -1) userToUpdate.savedTweets.splice(tweetIdx, 1)
        else userToUpdate.savedTweets.push(structuredClone(tweet._id))
        dispatch(updateUser(userToUpdate))
        dispatch(setLoggedinUser(userToUpdate))

        const tweetToUpdate: Tweet = structuredClone(tweet)
        const userIdx = tweetToUpdate.savedBy.findIndex(savedById => savedById === loggedinUser._id)
        if (userIdx !== -1) tweetToUpdate.savedBy.splice(userIdx, 1)
        else tweetToUpdate.savedBy.push(structuredClone(loggedinUser._id))
        dispatch(updateTweet(tweetToUpdate))
    }



    if (!tweet._id || !tweet.createdAt || !loggedinUser || !tweetCreatedByUser) return <div>Loading...</div>

    return (
        <article className="tweet card">
            <div className="card-header">
                <img className="user-img" src={tweetCreatedByUser?.profileImg} alt="user image" onClick={() => navigateTo()} />
                <div className="user-info">
                    <span className="user-name" onClick={() => navigateTo()}>{tweetCreatedByUser?.firstName} {tweetCreatedByUser?.lastName}</span>
                    <span className="sub-info">{utilService.timeStampConverter(tweet.createdAt)}</span>
                </div>
            </div>
            <p className="tweet-txt">
                {tweet.content}
            </p>
            {(tweet.imgUrl) ?
                <img className="tweet-img" src={tweet.imgUrl} alt="" />
                :
                ''
            }

            <div className="expose-info">
                {tweet.likes?.length ? <span> {tweet.likes.length} Likes</span> : ''}
                {tweet.replies?.length ? <span> {tweet.replies.length} Replies</span> : ''}
                <span>59k Retweets</span>
                {tweet.savedBy.length ? <span> {tweet.savedBy.length} Saved</span> : ''}
            </div>

            <div className="action-btns">
                <button className='action-btn' onClick={() => childInputRef.current?.focus()}>
                    <SvgIcon iconName="comment" wrapperStyle="comment" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    <span className="action-type">Comment</span>
                </button>
                <button className='action-btn retweet'>
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

            <AddReply loggedinUser={loggedinUser} tweetToEditId={tweet._id} childInputRef={childInputRef} />

            {(tweet.replies.length && repliesCreatedByUsers) ?
                <ReplyList replies={tweet.replies} repliesCreatedByUsers={repliesCreatedByUsers} />
                :
                ''
            }

        </article>
    )
}