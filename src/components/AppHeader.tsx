import SvgIcon from '../SvgIcon';
import { NavLinks } from './NavLinks';


type Props = {}

export function AppHeader({ }: Props) {
    return (
        <header className='main-header'>
            <div className="header-container">
                <div className="logo">
                    <img src="src\assets\icons\twitter_gif_no_bgc.gif" alt="" className='twitter' />
                    <span>ReTwitt</span>
                </div>
                <NavLinks />
                <div className="user">
                    <img src="" alt="" className="user-img" />
                    <div className='account'>
                        <img src='https://res.cloudinary.com/retwitt/image/upload/v1675257402/tomer-avatar_gqqzev.png' alt="user image" className="user-img" />
                        <span className="user-name">Tomer Vardi</span>
                        <SvgIcon iconName="expand_more" wrapperStyle="expand_more" svgProp={{ stroke: "black", fill: "black" }} />

                        <article className="account-modal modal" hidden>
                            <div className="modal-item">
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