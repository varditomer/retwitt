// React / Redux
import { useEffect, useState } from "react"
// Interfaces
import { Reply, Tweet } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
// Services
import { tweetService } from "../../../services/tweet.service"
import { toast } from 'react-toastify'
// Components
import { SvgIcon } from "../../app-general_cmps/SvgIcon"
import { NameAcronym } from "../../app-general_cmps/NameAcronym"
import { uploadImg } from "../../../services/img-upload.service"


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
    const notify = () => toast.success("Reply added")

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

    const onUploadImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!newReply) return
        if (!ev.target.files) return
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        const replyToSave = structuredClone(newReply)
        replyToSave.imgUrl = res.secure_url
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

                notify()

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
                    <div className="img-upload-container">
                        <input type="file" onChange={onUploadImg} />
                        <SvgIcon iconName="img" wrapperStyle="img-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    </div>
                </form>
            }
        </>
    )
}
