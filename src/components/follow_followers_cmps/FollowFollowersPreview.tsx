// Interfaces
import { User } from "../../interfaces/user.interface"
// Components
import { SvgIcon } from "../app-general_cmps/SvgIcon"
import { NameAcronym } from "../app-general_cmps/NameAcronym"


type Props = {
    user: User,
    loggedinUser: User
    onNavigateTo: Function,
    toggleFollowUser: Function
}

export const FollowFollowersPreview: React.FC<Props> = ({ user, onNavigateTo, toggleFollowUser, loggedinUser }) => {

    const onToggleFollowUser = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()
        toggleFollowUser(user)
    }

    return (
        <li className='person-card' onClick={() => onNavigateTo(user)}>
            <div className="card-header">
                {user.profileImg ?
                    <img className="user-img" src={user.profileImg} alt="user image" />
                    :
                    <NameAcronym firstName={user.firstName} lastName={user.lastName} userId={user._id} />
                }
                <div className="user-info">
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    {(user.followers?.length) ? <span className="sub-info">{user.followers.length} Followers</span> : <span className="sub-info">No followers yet</span>}
                </div>
                {loggedinUser._id !== user._id && <button type="button" className="btn-follow" onClick={(ev) => onToggleFollowUser(ev)}>
                    {loggedinUser.follows.includes(user._id) ?
                        <>
                            <SvgIcon iconName="unfollow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                            <span>Unfollow</span>
                        </>
                        :
                        <>
                            <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                            <span>Follow</span>
                        </>
                    }
                </button>
                }
            </div>
            <p className="about">
                {user.about}
            </p>
            {user.coverImg && <img className="follow-followers-cover-img" src={user.coverImg} alt="user cover image" />}
        </li>
    )

}