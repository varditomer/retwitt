import { useNavigate } from "react-router"
import { useTimestampConverter } from "../../../hooks/useTimestampConverter"
import { Reply } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
import SvgIcon from "../../../SvgIcon"

type Props = {
    reply: Reply
    user: User,
    loggedinUser: User,
    toggleLikeReply: Function

}



export const ReplyPreview: React.FC<Props> = ({ reply, user, loggedinUser, toggleLikeReply }) => {

    const convertedTime = useTimestampConverter(reply.createdAt)

    const navigate = useNavigate()

    const navigateTo = () => {
        navigate(`/home/${user._id}/tweets`)
    }

    const isLikeClicked = () => {
        return reply.likes.includes(loggedinUser._id)
    }

    return (
        <div className="reply">
            <div className="reply-head">
                <img className="user-img" src={user.profileImg} alt="user image" onClick={() => navigateTo()} />
                <div className="reply-body">
                    <div className="user-info">
                        <span className="user-name" onClick={() => navigateTo()}>{user.firstName} {user.lastName}</span>
                        <span className="user-followers">{convertedTime}</span>
                    </div>
                    <p className="reply-content">
                        {reply.content}
                    </p>
                </div>
            </div>
            <div className="reply-action">
                <div className={`like ${(isLikeClicked()) ? 'active' : ''}`} onClick={() => toggleLikeReply(reply)}>
                    <SvgIcon iconName="like" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                    <span>like</span>
                </div>
                {(reply.likes.length) ?
                    <span className="likes-count">{reply.likes.length} Likes</span>
                    :
                    ''
                }
            </div>
        </div>
    )
}