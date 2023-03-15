// React / Redux
import { useNavigate } from "react-router"
// Interfaces
import { User } from "../../interfaces/user.interface"
// Components
import { SvgIcon } from "../app-general_cmps/SvgIcon"
import { FollowFollowersPreview } from "./FollowFollowersPreview"


type Props = {
    users: User[],
    loggedinUser: User,
    title: string,
    toggleFollowUser: Function,
    closeModal: ()=>void
    userFullName: string
}

export const FollowFollowersList: React.FC<Props> = ({ users, loggedinUser, title, toggleFollowUser, closeModal, userFullName }) => {

    const navigate = useNavigate()

    const onNavigateTo = (user: User) => {
        navigate(`/home/${user._id}`)
    }

    return (
        <section className="who-to-follow follow-followers-container card">
            <div className="card-title modal-header">
                <h2 className="title">{userFullName} {title}</h2>
                <SvgIcon iconName='cancel_small' wrapperStyle="cancel" svgProp={{ stroke: "#333333", fill: "#333333" }} handleClick={closeModal} />
            </div>
            <ul role='list' className="users-to-follow">
                {(!users.length) ?
                    <div className="no-users-to-follow">{userFullName} isn't {title} yet</div>
                    :
                    users?.map(user => <FollowFollowersPreview key={user._id} user={user} onNavigateTo={onNavigateTo} loggedinUser={loggedinUser} toggleFollowUser={toggleFollowUser} />)
                }
            </ul>
        </section>

    )
}