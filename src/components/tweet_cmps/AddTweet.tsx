import { useState } from "react"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    loggedinUser: User
}

export const AddTweet: React.FC<Props> = ({loggedinUser}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    }

    return (
        <article className="add-tweet card">
                    <h2 className='card-title'>Tweet something</h2>
                    <div className="card-header new-tweet">
                        <img src={loggedinUser.profileImg} alt="user image" className="user-img" />
                        <span className="tweet-input">What’s happening?</span>
                    </div>
                    <div className="control-btns">
                        <div className="settings">
                            <SvgIcon iconName="img" wrapperStyle="img-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                            <div className="public-settings">
                                <div className="public-settings-signs-wrapper" onClick={() => toggleModal()}>
                                    <SvgIcon iconName="earth" wrapperStyle="public-settings-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className='public-settings-txt'>Everyone can reply</span>
                                </div>
                                <article className={`public-settings-modal modal ${(!isModalOpen) ? 'hide' : ''}`}>
                                    <h2 className='modal-title'>Who can reply?</h2>
                                    <h3 className='modal-subtitle'>Choose who can reply to this Tweet.</h3>
                                    <div className="modal-item">
                                        <SvgIcon iconName="earth" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                        <span className="card-item-txt">Everyone</span>
                                    </div>
                                    <div className="modal-item">
                                        <SvgIcon iconName="people" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                        <span className="card-item-txt">People you follow</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <button className="btn-tweet">
                            <span>Tweet</span>
                        </button>
                    </div>
                </article>
    )
}