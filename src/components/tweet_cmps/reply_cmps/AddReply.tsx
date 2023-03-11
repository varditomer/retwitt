// React / Redux
import { useEffect, useState } from "react"
// Interfaces
import { Reply, Tweet } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
// Services
import { tweetService } from "../../../services/tweet.service"
// Components
import { SvgIcon } from "../../app-general_cmps/SvgIcon"
import { NameAcronym } from "../../app-general_cmps/NameAcronym"


type Props = {
    tweetToEdit: Tweet,
    loggedinUser: User,
    childInputRef: React.RefObject<HTMLInputElement>,
    onUpdateTweet: Function,
    tweetCreatedByUser: User

}


export const AddReply: React.FC<Props> = ({ tweetToEdit, loggedinUser, childInputRef, onUpdateTweet, tweetCreatedByUser }) => {

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
        if (!newReply) return
        setReplyContent(ev.target.value)
        const replyToSave = structuredClone(newReply)
        replyToSave.content = ev.target.value
        setNewReply(structuredClone(replyToSave))
    }

    const onAddReply = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!replyContent.length || !tweetToEdit || !newReply) return
        if (!tweetToEdit.isEveryOneCanReply && !tweetCreatedByUser.follows.includes(loggedinUser._id) && tweetToEdit.createdBy !== loggedinUser._id) return
        const tweetToSave = structuredClone(tweetToEdit)

        const replyToSave = structuredClone(newReply)
        tweetToSave.replies.unshift(replyToSave)

        onUpdateTweet(tweetToSave)

        const emptyReply = tweetService.getEmptyReply()
        setNewReply(emptyReply)
    }

    return (
        <>
            {(!tweetToEdit.isEveryOneCanReply && !tweetCreatedByUser.follows.includes(loggedinUser._id) && tweetToEdit.createdBy !== loggedinUser._id) ?
                <p className="bun-to-reply-msg">* User has set this tweet's replies only for people he follows.</p>
                :
                <form className="add-reply" onSubmit={onAddReply}>
                    {loggedinUser.profileImg ?
                        <img src={loggedinUser.profileImg} alt="user image" className="user-img" />
                        :
                        <NameAcronym firstName={loggedinUser.firstName} lastName={loggedinUser.lastName} userId={loggedinUser._id} />
                    }
                    <input ref={childInputRef} onChange={handleChange} type="text" placeholder='Tweet your reply' className="reply-input" value={replyContent} />
                    <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                </form>
            }
        </>
    )
}
