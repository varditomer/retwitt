import { useEffect, useState } from "react"
import { Reply, Tweet } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
import { tweetService } from "../../../services/tweet.service"
import SvgIcon from "../../../SvgIcon"


type Props = {
    tweetToEdit: Tweet,
    loggedinUser: User,
    childInputRef: React.RefObject<HTMLInputElement>,
    onUpdateTweet: Function
}


export const AddReply: React.FC<Props> = ({ tweetToEdit, loggedinUser, childInputRef, onUpdateTweet }) => {

    const [newReply, setNewReply] = useState<null | Reply>(null)
    const [replyContent, setReplyContent] = useState<string>('')

    useEffect(() => {
        const emptyReply = tweetService.getEmptyReply()
        setNewReply(emptyReply)
    }, [])

    useEffect(() => {
        if (!newReply) return
        setReplyContent(newReply?.content)
    }, [newReply])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setReplyContent(ev.target.value)
        const replyToSave = structuredClone(newReply)
        replyToSave.content = ev.target.value
        setNewReply(structuredClone(replyToSave))
    }

    const onAddReply = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!replyContent.length || !tweetToEdit) return
        const tweetToSave = structuredClone(tweetToEdit)

        const replyToSave = structuredClone(newReply)
        tweetToSave.replies.unshift(replyToSave)

        onUpdateTweet(tweetToSave)

        const emptyReply = tweetService.getEmptyReply()
        setNewReply(emptyReply)
    }

    return (
        <form className="add-reply" onSubmit={onAddReply}>
            <img src={loggedinUser.profileImg} alt="user image" className="user-img" />
            <input ref={childInputRef} onChange={handleChange} type="text" placeholder='Tweet your reply' className="reply-input" value={replyContent} />
            <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
        </form>
    )
}
