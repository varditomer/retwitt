import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { INITIAL_STATE } from "../../interfaces/state.interface"
import { User } from "../../interfaces/user.interface"
import { setLoggedinUser, updateUser } from "../../store/actions/user.action"
import { WhoToFollowPreview } from "./WhoToFollowPreview"

type Props = {
    users: User[]
    loggedinUser: User
}

export const WhoToFollowList: React.FC<Props> = ({ users, loggedinUser }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const onNavigateTo = (user: User) => {
        navigate(`/home/${user._id}/tweets`)
    }

    const followUser = (user: User) => {
        const userToUpdate: User = structuredClone(loggedinUser)
        userToUpdate.follows.push(user._id)

        document.querySelector("body")?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        dispatch(updateUser(userToUpdate))
        dispatch(setLoggedinUser(userToUpdate))
    }

    return (
        <section className="who-to-follow card">
            <h2 className='card-title'>Who to follow</h2>
            <ul role='list' className="users-to-follow">
                {(!users.length) ?
                    <div className="no-users-to-follow">No users to add!</div>
                    :
                    users?.map(user => <WhoToFollowPreview key={user._id} user={user} onNavigateTo={onNavigateTo} followUser={followUser} />)
                }
            </ul>
        </section>

    )
}