// React / Redux:
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
// Interfaces:
import { INITIAL_STATE } from '../interfaces/state.interface';
import { User } from '../interfaces/user.interface';
// Actions:
import { logout } from '../store/actions/user.action';
// Components & Hooks:
import SvgIcon from '../SvgIcon';
import { Modal } from './Modal';
import { NavLinks } from './NavLinks';


type Props = {
    loggedinUser: User
}

export const AppHeader: React.FC<Props> = ({ loggedinUser }) => {
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()
    const [showAccountModal, setShowAccountModal] = useState(false)

    const navigate = useNavigate()

    const navigateTo = () => {
        setShowAccountModal(false)
        navigate(`/home/${loggedinUser._id}/tweets`)
    }

    const toggleModal = () => {
        setShowAccountModal(prevShowAccountModal => !prevShowAccountModal)
    }

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className='main-header'>
            <div className="header-container">
                <div className="logo" onClick={() => navigate(`/home`)}>
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


                        {showAccountModal ?
                            <Modal modalClass='account-modal'>
                                <div className="modal-item" onClick={navigateTo}>
                                    <SvgIcon iconName="profile" wrapperStyle="profile" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                    <span className="card-item-txt">My Profile</span>
                                </div>
                                <div className="modal-item">
                                    <SvgIcon iconName="settings" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                    <span className="card-item-txt">Settings</span>
                                </div>
                                <div className="modal-item-container">
                                    <div className="modal-item negative" onClick={onLogout}>
                                        <SvgIcon iconName="logout" wrapperStyle="card-item-icon" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                        <span className="card-item-txt">Logout</span>
                                    </div>
                                </div>
                            </Modal>
                            :
                            ''
                        }


                    </div>
                </div>
            </div>
        </header>
    )
}