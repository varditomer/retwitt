import { MouseEvent } from "react"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    user: User,
    onNavigateTo: Function,
    followUser: Function 
}

export const WhoToFollowPreview: React.FC<Props> = ({ user, onNavigateTo, followUser }) => {

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()
        followUser(user)
    }

    return (
        <li className='person-card' onClick={() => onNavigateTo(user)}>
            <div className="card-header">
                <img className="user-img" src={user.profileImg} alt="user image" />
                <div className="user-info">
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    {(user.followers?.length) ? <span className="sub-info">{user.followers.length} Followers</span> : <span className="sub-info">No followers yet</span>}
                </div>
                <button type="button" className="btn-follow" onClick={(ev) => handleClick(ev)}>
                    <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                    <span>Follow</span>
                </button>
            </div>
            <p className="about">
                {user.about}
            </p>
            <img className="cover-img" src={user.coverImg} alt="user cover image" />
        </li>
    )

}