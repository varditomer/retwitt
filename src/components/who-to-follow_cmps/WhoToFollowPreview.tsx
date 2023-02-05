import { MouseEvent } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    user: User
}

export const WhoToFollowPreview: React.FC<Props> = ({ user }) => {

    const navigate = useNavigate()


    const navigateTo = () => {
        navigate(`/home/${user._id}/tweets`)
    }


    const handleClick = (ev: MouseEvent) => {
        ev.preventDefault()
        ev.stopPropagation()
    }

    return (
        // <NavLink to={`/home/${user._id}/tweets`}>
            <li className='person-card' onClick={() => navigateTo()}>
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
        // </NavLink>
    )

}