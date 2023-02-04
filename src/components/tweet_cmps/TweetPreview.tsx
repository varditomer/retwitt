import React from 'react'
import { useTimestampConverter } from '../../hooks/useTimestampConverter'
import { Tweet } from '../../interfaces/tweet.interface'
import { User } from '../../interfaces/user.interface'
import SvgIcon from '../../SvgIcon'
import { ReplyList } from './reply_cmps/ReplytList'

type Props = {
    tweet: Tweet
    loggedinUser: User
}

export const TweetPreview: React.FC<Props> = ({ tweet, loggedinUser }) => {

    const convertedTime = useTimestampConverter(tweet.createdAt);

    return (
        <article className="tweet card">
            <div className="card-header">
                <img className="user-img" src={tweet.createdBy.profileImg} alt="user image" />
                <div className="user-info">
                    <span className="user-name">{tweet.createdBy.firstName} {tweet.createdBy.lastName}</span>
                    <span className="sub-info">{convertedTime}</span>
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
                <span>234 Saved</span>
            </div>

            <div className="action-btns">
                <button className='action-btn'>
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

            <div className="add-reply">
                <img src={loggedinUser.profileImg} alt="user image" className="user-img" />
                <input type="text" placeholder='Tweet your reply' className="reply-input" />
                <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            </div>


            {(tweet.replies.length) ? <ReplyList replies={tweet.replies} /> : ''}
        </article>
    )
}