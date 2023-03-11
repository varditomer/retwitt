// React / Redux
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
// Interfaces
import { INITIAL_STATE } from "../../interfaces/state.interface"
import { hashtags, Tweet } from "../../interfaces/tweet.interface"
import { User } from "../../interfaces/user.interface"
// Actions
import { addTweet, updateHashtags } from "../../store/actions/tweet.action"
// Custom hooks
import { useClickOutside } from "../../hooks/useClickOutside"
// Services
import { uploadImg } from "../../services/img-upload.service"
import { tweetService } from "../../services/tweet.service"
// Components
import { SvgIcon } from "../../SvgIcon"
import { Modal } from "../Modal"
import { NameAcronym } from "../NameAcronym"


type Props = {
    loggedinUser: User,
    hashtags: hashtags
}

export const AddTweet: React.FC<Props> = ({ loggedinUser, hashtags }) => {

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const [showWhoCanReplyModal, setShowWhoCanReplyModal] = useState(false)
    const [newTweet, setNewTweet] = useState<null | Tweet>(null)
    const [tweetContent, setTweetContent] = useState<string>('')
    const [whoCanReplyText, setWhoCanReplyText] = useState<string>('Everyone can reply')

    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, modalTriggerRef, () => setShowWhoCanReplyModal(false))


    useEffect(() => {
        const emptyTweet = tweetService.getEmptyTweet()
        setNewTweet(emptyTweet)
    }, [])

    useEffect(() => {
        if (!newTweet) return
        setTweetContent(newTweet?.content)
    }, [newTweet])

    const toggleModal = () => {
        setShowWhoCanReplyModal(prevShowWhoCanReplyModal => !prevShowWhoCanReplyModal)
    }

    const onUploadImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!newTweet) return
        if (!ev.target.files) return
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        const tweetToSave: Tweet = structuredClone(newTweet)
        tweetToSave.imgUrl = res.secure_url
        setNewTweet(structuredClone(tweetToSave))
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!newTweet) return
        setTweetContent(ev.target.value)
        const tweetToSave: Tweet = structuredClone(newTweet)
        tweetToSave.content = ev.target.value
        setNewTweet(structuredClone(tweetToSave))
    }

    const toggleIsEveryOneCanReplySettings = (isEveryOneCanReply: boolean) => {
        if (!newTweet) return
        const tweetToSave: Tweet = structuredClone(newTweet)
        setShowWhoCanReplyModal(false)
        if (isEveryOneCanReply) {
            setWhoCanReplyText('Everyone can reply')
            tweetToSave.isEveryOneCanReply = true
        } else {
            setWhoCanReplyText('People you follow')
            tweetToSave.isEveryOneCanReply = false
        }
        setNewTweet(tweetToSave)
    }

    const onAddTweet = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!newTweet || !hashtags) return

        const tweetToSave = structuredClone(newTweet)
        const matches = tweetToSave.content.match(/#(\w+)/g)
        const newHashtags = matches?.map(match => match.toLowerCase().slice(1))
        if (newHashtags) {
            const uniqueHashtags = [...new Set(newHashtags)] // The Set object lets you store unique values of any type, including strings.
            dispatch(updateHashtags(uniqueHashtags, hashtags))
            tweetToSave.hashtags = uniqueHashtags
        }
        dispatch(addTweet(tweetToSave))

        const emptyTweet = tweetService.getEmptyTweet()
        setNewTweet(emptyTweet)
    }
    
    if (!loggedinUser) return <div>Loading...</div>

    return (
        <form className="add-tweet card" onSubmit={onAddTweet}>
            <h2 className='card-title'>Tweet something</h2>
            <div className="card-header new-tweet">
                {loggedinUser.profileImg ?
                    <img src={loggedinUser.profileImg} alt="user image" className="user-img" /> :
                    <NameAcronym className="user-img" firstName={loggedinUser.firstName} lastName={loggedinUser.lastName} userId={loggedinUser._id} />
                }
                <input onChange={handleChange} className="tweet-input" placeholder="What’s happening?" value={tweetContent} />
            </div>
            <div className="control-btns">
                <div className="settings">
                    <div className="img-upload-container">
                        <input type="file" onChange={onUploadImg} />
                        <SvgIcon iconName="img" wrapperStyle="img-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    </div>
                    {/* <div className="add-reaction-container">
                        <div className="add-reaction-container">
                        <SvgIcon iconName="add_reaction" wrapperStyle="add-reaction" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        <div className={`emoji-picker-container ${(isEmojiClicked) ? '' : 'hide'}`}>
                            <EmojiPicker />
                        </div>
                    </div> */}
                    <div className="public-settings">
                        {/* Choose between everyone can reply or only people i follow will can */}
                        <div className="public-settings-signs-wrapper" onClick={toggleModal} ref={modalTriggerRef}>
                            <SvgIcon iconName="earth" wrapperStyle="public-settings-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                            <span className='public-settings-txt'>{whoCanReplyText}</span>
                        </div>
                        {showWhoCanReplyModal &&
                            <Modal modalClass="public-settings-modal" modalRef={modalRef}>
                                <h2 className='modal-title'>Who can reply?</h2>
                                <h3 className='modal-subtitle'>Choose who can reply to this Tweet.</h3>
                                <div className="modal-item" onClick={() => toggleIsEveryOneCanReplySettings(true)}>
                                    <SvgIcon iconName="earth" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                    <span className="card-item-txt">Everyone</span>
                                </div>
                                <div className="modal-item" onClick={() => toggleIsEveryOneCanReplySettings(false)}>
                                    <SvgIcon iconName="people" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                    <span className="card-item-txt">People you follow</span>
                                </div>
                            </Modal>
                        }


                    </div>
                </div>

                <button type="submit" className="add-tweet-btn" disabled={newTweet?.content.length ? false : true} title={newTweet?.content.length ? 'Click to add new tweet' : 'Enter tweet content first'}>
                    <span>Tweet</span>
                </button>
            </div>
        </form>
    )
}