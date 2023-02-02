import { Reply } from "../../../interfaces/tweet.interface"
import { ReplyPreview } from "./ReplyPreview"

type Props = {
    replies: Reply[]
}



export const ReplyList: React.FC<Props> = ({ replies }) => {


    return (
        <section className="replies">
            {replies.map((reply: Reply) =>
                <ReplyPreview key={reply._id} reply={reply} />
            )}
        </section>
    )
}