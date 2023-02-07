import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { INITIAL_STATE } from "../../../interfaces/state.interface"
import { Reply, Tweet } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
import { tweetService } from "../../../services/tweet.service"
import { updateTweet } from "../../../store/actions/tweet.action"
import SvgIcon from "../../../SvgIcon"


type Props = {
    tweetToEdit: Tweet,
    loggedinUser: User,
    childInputRef: React.RefObject<HTMLInputElement>
}


export const AddReply: React.FC<Props> = ({ tweetToEdit, loggedinUser, childInputRef  }) => {

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    // const [tweetToSave, setTweetToSave] = useState<null | Tweet>(null)
    const [newReply, setNewReply] = useState<null | Reply>(null)
    const [replyContent, setReplyContent] = useState<string>('')

    useEffect(() => {

        // const tweet = structuredClone(tweetToEdit)
        // setTweetToSave(tweet)

        const emptyReply = tweetService.getEmptyReply()
        setNewReply(emptyReply)
        console.log(`tweetToEdit:`, tweetToEdit)

    }, [])

    useEffect(() => {
        if (!newReply) return
        setReplyContent(newReply?.content)
    }, [newReply])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`ev.target.value:`, ev.target.value)
        setReplyContent(ev.target.value)
        const replyToSave = structuredClone(newReply)
        replyToSave.content = ev.target.value
        setNewReply(structuredClone(replyToSave))
    }

    const onAddReply = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const replyToSave = structuredClone(newReply)

        const tweet: Tweet = structuredClone(tweetToEdit)
        tweet.replies.push(replyToSave)

        dispatch(updateTweet(tweet))

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
