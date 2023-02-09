import { Reply } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
import { ReplyPreview } from "./ReplyPreview"

type Props = {
    replies: Reply[]
    repliesCreatedByUsers: User[],
    loggedinUser: User,
    toggleLikeReply: Function
}



export const ReplyList: React.FC<Props> = ({ replies, repliesCreatedByUsers, loggedinUser, toggleLikeReply }) => {
    
    const user = (reply: Reply): User => repliesCreatedByUsers.find(user => user._id === reply.createdBy)!

        return (
            <section className="reply-list">
                {replies.map((reply: Reply) =>
                    <ReplyPreview key={reply._id} reply={reply} user={user(reply)} loggedinUser={loggedinUser} toggleLikeReply={toggleLikeReply} />
                )}
            </section>
        )
    }