import { useTimestampConverter } from "../../../hooks/useTimestampConverter"
import { Reply } from "../../../interfaces/tweet.interface"
import SvgIcon from "../../../SvgIcon"

type Props = {
    reply: Reply
}



export const ReplyPreview: React.FC<Props> = ({reply}) => {

    const convertedTime = useTimestampConverter(reply.createdAt);


    return (
        <div className="reply">
            <div className="reply-head">
                <img className="user-img" src={reply.createdBy.profileImg} alt="user image" />
                <div className="reply-body">
                    <div className="user-info">
                        <span className="user-name">{reply.createdBy.firstName} {reply.createdBy.lastName}</span>
                        <span className="user-followers">{convertedTime}</span>
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