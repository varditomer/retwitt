// React / Redux
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
// Interfaces
import { INITIAL_STATE } from "../../interfaces/state.interface"
import { Hashtags, Tweet } from "../../interfaces/tweet.interface"
import { User } from "../../interfaces/user.interface"
// Actions
import { addTweet, updateHashtags } from "../../store/actions/tweet.action"
// Custom hooks
import { useClickOutside } from "../../hooks/useClickOutside"
// Services
import { uploadImg } from "../../services/img-upload.service"
import { tweetService } from "../../services/tweet.service"
import { toast } from 'react-toastify'
// Components
import { SvgIcon } from "../app-general_cmps/SvgIcon"
import { Modal } from "../app-general_cmps/Modal"
import { NameAcronym } from "../app-general_cmps/NameAcronym"
import { useNavigate } from "react-router"
import { Loader } from "../app-general_cmps/Loader"

type Props = {
    loggedinUser: User,
    hashtags: Hashtags
}

export const AddTweet: React.FC<Props> = ({ loggedinUser, hashtags }) => {

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()
    
    const [showWhoCanReplyModal, setShowWhoCanReplyModal] = useState(false)
    const [newTweet, setNewTweet] = useState<null | Tweet>(null)
    const [tweetContent, setTweetContent] = useState<string>('')
    const [whoCanReplyText, setWhoCanReplyText] = useState<string>('Everyone can reply')
    const [isImgUploading, setIsImgUploading] = useState(false)
    const navigate = useNavigate()


    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, () => setShowWhoCanReplyModal(false), modalTriggerRef)
    const notifyInfo = (msg:string) => toast.info(msg)

    useEffect(() => {
        const emptyTweet = tweetService.getEmptyTweet()
        setNewTweet(emptyTweet)
    }, [])

    useEffect(() => {
        if (!newTweet) return
        setTweetContent(newTweet?.content)
    }, [newTweet])

    const navigateTo = () => {
        navigate(`/home/${loggedinUser._id}`)
    }

    const toggleModal = () => {
        setShowWhoCanReplyModal(prevShowWhoCanReplyModal => !prevShowWhoCanReplyModal)
    }

    const onUploadImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!newTweet) return
        if (!ev.target.files) return
        setIsImgUploading(true)
        notifyInfo("Uploading image, wait for image before tweeting!")
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        const tweetToSave: Tweet = structuredClone(newTweet)
        tweetToSave.imgUrl = res.secure_url
        setNewTweet(structuredClone(tweetToSave))
        setIsImgUploading(false)
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
                    <img src={loggedinUser.profileImg} alt="user image" className="user-img" onClick={navigateTo} /> :
                    <NameAcronym className="user-img" firstName={loggedinUser.firstName} lastName={loggedinUser.lastName} userId={loggedinUser._id} />
                }
                <input onChange={handleChange} className="tweet-input" placeholder="What’s happening?" value={tweetContent} />

            </div>
            {isImgUploading && <Loader />}
            {newTweet?.imgUrl && <img src={newTweet.imgUrl} alt="tweet-img image" className="add-tweet-img" />}
            <div className="control-btns">
                <div className="settings">
                    <div className="img-upload-container">
                        <input type="file" onChange={onUploadImg} />
                        <SvgIcon iconName="img" wrapperStyle="img-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                    </div>
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

                <button type="submit" className="add-tweet-btn" disabled={(newTweet?.content.length || !isImgUploading) ? false : true} title={newTweet?.content.length ? 'Click to add new tweet' : 'Enter tweet content first'}>
                    <span>Tweet</span>
                </button>
            </div>
        </form>
    )
}