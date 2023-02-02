import { Reply } from "../../../interfaces/tweet.interface"
import SvgIcon from "../../../SvgIcon"

type Props = {
    reply: Reply
}



export const ReplyPreview: React.FC<Props> = ({reply}) => {

    return (
        <div className="reply">
            <div className="reply-head">
                <img className="user-img" src='src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                <div className="reply-body">
                    <div className="user-info">
                        <span className="user-name">Ronen Boxer</span>
                        <span className="user-followers">{reply.createdAt}</span>
                    </div>
                    <p className="reply-content">
                        {reply.content}
                    </p>
                </div>
            </div>
            <div className="reply-action">
                <div className="like">
                    <SvgIcon iconName="like" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                    <span>like</span>
                </div>
                <span className="likes-count">{reply.likes.length}</span>
            </div>
        </div>
    )
}