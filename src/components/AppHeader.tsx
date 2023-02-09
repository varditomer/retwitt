import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../interfaces/user.interface';
import SvgIcon from '../SvgIcon';
import { NavLinks } from './NavLinks';


type Props = {
    loggedinUser: User
}

export const AppHeader: React.FC<Props> = ({ loggedinUser }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()

    const navigateTo = () => {
        setIsModalOpen(false)
        navigate(`/home/${loggedinUser._id}/tweets`)
    }

    const toggleModal = () => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    }

    return (
        <header className='main-header'>
            <div className="header-container">
                <div className="logo" onClick={()=>navigate(`/`)}>
                    <img src="src\assets\icons\twitter_gif_no_bgc.gif" alt="" className='twitter' />
                    <span>ReTwitt</span>
                </div>
                <NavLinks />
                <div className="user">
                    <img src="" alt="" className="user-img" />
                    <div className='account'>
                        <div className="account-icons-container" onClick={toggleModal}>
                            <img src={loggedinUser.profileImg} alt="user image" className="user-img" />
                            <span className="user-name">{loggedinUser.firstName} {loggedinUser.lastName}</span>
                            <SvgIcon iconName="expand_more" wrapperStyle="expand_more" svgProp={{ stroke: "black", fill: "black" }} />
                        </div>


                        <article className={`account-modal modal ${(!isModalOpen) ? 'hide' : ''}`}>
                            <div className="modal-item" onClick={navigateTo}>
                                <SvgIcon iconName="profile" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                <span className="card-item-txt">My Profile</span>
                            </div>
                            <div className="modal-item">
                                <SvgIcon iconName="people" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                <span className="card-item-txt">Group Chat</span>
                            </div>
                            <div className="modal-item">
                                <SvgIcon iconName="settings" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                <span className="card-item-txt">Settings</span>
                            </div>
                            <div className="modal-item logout">
                                <SvgIcon iconName="logout" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                <span className="card-item-txt">Logout</span>
                            </div>
                        </article>


                    </div>
                </div>
            </div>
        </header>
    )
}