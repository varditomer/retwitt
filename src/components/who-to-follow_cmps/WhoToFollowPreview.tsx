import { MouseEvent } from "react"
import { NavLink } from "react-router-dom"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    user: User
}

export const WhoToFollowPreview: React.FC<Props> = ({ user }) => {
    


    const handleClick = (ev: MouseEvent) => {
        ev.preventDefault()
    }

    return (
        <NavLink to={`/home/${user._id}/tweets`}>
            <li className='person-card'>
                <div className="card-header">
                    <img className="user-img" src={user.profileImg} alt="user image" />
                    <div className="user-info">
                        <span className="user-name">{user.firstName} {user.lastName}</span>
                        <span className="sub-info">230k followers</span>
                    </div>
                    <button type="button" className="btn-follow" onClick={(ev)=>handleClick(ev)}>
                        <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                        <span>Follow</span>
                    </button>
                </div>
                <p className="about">
                    {user.about}
                </p>
                <img className="cover-img" src={user.coverImg} alt="user cover image" />
            </li>
        </NavLink>
    )

}