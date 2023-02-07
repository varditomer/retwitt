import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface'
import { utilService } from '../../services/util.service'
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

    const navigate = useNavigate()

    const navigateTo = () => {
        navigate(`/home/${tweet.createdBy}/tweets`)
    }

    const childInputRef = useRef<HTMLInputElement>(null)


    if (!tweet.createdAt || !loggedinUser || !tweetCreatedByUser) return <div>Loading...</div>

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
                <button className='action-btn' onClick={()=>childInputRef.current?.focus()}>
                    <SvgIcon iconName="comment" wrapperStyle="comment" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    <span className="action-type">Comment</span>
                </button>
                <button className='action-btn retweet'>
                    <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    <span className="action-type">Retweet</span>
                </button>
                <button className='action-btn like'>
                    <SvgIcon iconName="like" wrapperStyle="" />
                    <span className="action-type">Like</span>
                </button>
                <button className='action-btn bookmark'>
                    <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    <span className="action-type">Save</span>
                </button>
            </div>

            <AddReply loggedinUser={loggedinUser} tweetToEdit={tweet} childInputRef={childInputRef} />

            {(tweet.replies.length && repliesCreatedByUsers) ?
                <ReplyList replies={tweet.replies} repliesCreatedByUsers={repliesCreatedByUsers} />
                :
                ''
            }

        </article>
    )
}