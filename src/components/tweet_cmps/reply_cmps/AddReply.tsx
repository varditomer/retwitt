import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { INITIAL_STATE, TweetState } from "../../../interfaces/state.interface"
import { Reply, Tweet } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
import { tweetService } from "../../../services/tweet.service"
import { updateTweet } from "../../../store/actions/tweet.action"
import SvgIcon from "../../../SvgIcon"


type Props = {
    tweetToEditId: string,
    loggedinUser: User,
    childInputRef: React.RefObject<HTMLInputElement>,
}


export const AddReply: React.FC<Props> = ({ tweetToEditId, loggedinUser, childInputRef }) => {

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()
    const tweet = useSelector((state: TweetState) => state.tweetModule.tweets.filter(tweet => tweet._id === tweetToEditId))[0]

    const [newReply, setNewReply] = useState<null | Reply>(null)
    const [tweetToEdit, setTweetToEdit] = useState<null | Tweet>(null)
    const [replyContent, setReplyContent] = useState<string>('')

    useEffect(() => {
        const emptyReply = tweetService.getEmptyReply()
        setNewReply(emptyReply)
    }, [])

    useEffect(() => {
        if (!newReply) return
        setReplyContent(newReply?.content)
    }, [newReply])

    useEffect(() => {
        if (!tweet) return
        setTweetToEdit(structuredClone(tweet))
    }, [])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setReplyContent(ev.target.value)
        const replyToSave = structuredClone(newReply)
        replyToSave.content = ev.target.value
        setNewReply(structuredClone(replyToSave))
    }

    const onAddReply = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!replyContent.length || !tweetToEdit) return

        const replyToSave = structuredClone(newReply)
        tweetToEdit.replies.unshift(replyToSave)

        dispatch(updateTweet(tweetToEdit))

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
