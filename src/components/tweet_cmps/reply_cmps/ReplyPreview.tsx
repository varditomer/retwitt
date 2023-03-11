// React / Redux
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
// Interfaces
import { Reply } from "../../../interfaces/tweet.interface"
import { User } from "../../../interfaces/user.interface"
// Custom hooks
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useTimestampConverter } from "../../../hooks/useTimestampConverter"
// Components
import { SvgIcon } from "../../../SvgIcon"
import { Modal } from "../../Modal"
import { NameAcronym } from "../../NameAcronym"


type Props = {
    reply: Reply
    replyCreatedByUser: User,
    loggedinUser: User,
    toggleLikeReply: Function,
    removeReply: Function,
    toggleFollowUser: Function

}



export const ReplyPreview: React.FC<Props> = ({ reply, replyCreatedByUser, loggedinUser, toggleLikeReply, removeReply, toggleFollowUser }) => {

    const convertedTime = useTimestampConverter(reply.createdAt)

    const [showReplyOptModal, setShowReplyOptModal] = useState(false)

    let modalTriggerRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, modalTriggerRef, () => setShowReplyOptModal(false))

    const toggleModal = () => {
        setShowReplyOptModal(prevShowReplyOptModal => !prevShowReplyOptModal)
    }

    const navigate = useNavigate()

    const navigateTo = () => {
        navigate(`/home/${replyCreatedByUser._id}/tweets`)
    }

    const isLikeClicked = () => {
        return reply.likes.includes(loggedinUser._id)
    }

    const onRemoveReply = () => {
        if (!reply._id || reply.createdBy !== loggedinUser._id) return
        setShowReplyOptModal(false)
        removeReply(reply._id)
    }

    const onToggleFollowUser = (userId: string) => {
        if (reply.createdBy === loggedinUser._id) return
        setShowReplyOptModal(false)
        toggleFollowUser(userId)
    }


    return (
        <div className="reply">
            <div className="reply-head">
                {replyCreatedByUser.profileImg ?
                    <img className="user-img" src={replyCreatedByUser.profileImg} alt="user image" onClick={() => navigateTo()} />
                    :
                    <NameAcronym className="user-img" firstName={replyCreatedByUser.firstName} lastName={replyCreatedByUser.lastName} userId={replyCreatedByUser._id} />
                }
                <div className="reply-body">
                    <div className="reply-info-container">
                        <div className="reply-info">
                            <span className="user-name" onClick={() => navigateTo()}>{replyCreatedByUser.firstName} {replyCreatedByUser.lastName}</span>
                            <span className="reply-time">{convertedTime}</span>
                        </div>

                        <div className="options-container" onClick={toggleModal} ref={modalTriggerRef}>
                            <SvgIcon iconName="options" wrapperStyle="options-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                        </div>

                        {(showReplyOptModal) ?
                            <Modal modalClass="reply-opt-modal"  modalRef={modalRef}>
                                <div className="modal-item">
                                    <SvgIcon iconName="copy_txt" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                    <span className="card-item-txt">Copy reply text</span>
                                </div>
                                {(loggedinUser.follows.includes(reply.createdBy)) ?
                                    <>
                                        <div className="modal-item-container">
                                            <div className="modal-item negative" onClick={() => onToggleFollowUser(reply.createdBy)}>
                                                <SvgIcon iconName="unfollow_big" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                                <span className="card-item-txt">Unfollow</span>
                                            </div>
                                        </div>
                                        {(reply.createdBy === loggedinUser._id) ?
                                            <div className="modal-item negative" onClick={onRemoveReply}>
                                                <SvgIcon iconName="remove" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                                <span className="card-item-txt">Delete reply</span>
                                            </div>
                                            :
                                            ''
                                        }
                                    </>
                                    :
                                    <>
                                        {reply.createdBy === loggedinUser._id ?
                                            ''
                                            :
                                            <div className="modal-item-container">
                                                <div className="modal-item positive" onClick={() => onToggleFollowUser(reply.createdBy)}>
                                                    <SvgIcon iconName="follow_big" wrapperStyle="card-item-icon" svgProp={{ stroke: "#1da1f2", fill: "#1da1f2" }} />
                                                    <span className="card-item-txt">Follow</span>
                                                </div>
                                            </div>
                                        }
                                        {(reply.createdBy === loggedinUser._id) ?
                                            <div className="modal-item-container">
                                                <div className="modal-item negative" onClick={onRemoveReply}>
                                                    <SvgIcon iconName="remove" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                                    <span className="card-item-txt">Delete reply</span>
                                                </div>
                                            </div>
                                            :
                                            ''
                                        }
                                    </>
                                }
                            </Modal>
                            :
                            ''
                        }

                    </div>
                    <p className="reply-content">
                        {reply.content}
                    </p>
                </div>
            </div>
            <div className="reply-action">
                <div className={`like ${(isLikeClicked()) ? 'active' : ''}`} onClick={() => toggleLikeReply(reply._id)}>
                    <SvgIcon iconName="like" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                    <span>like</span>
                </div>
                {(reply.likes.length) ?
                    <span className="likes-count">{reply.likes.length} Likes</span>
                    :
                    ''
                }
            </div>
        </div>
    )
}