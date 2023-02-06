import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"
import { WhoToFollowPreview } from "./WhoToFollowPreview"

type Props = {
    users: User[]
}

export const WhoToFollowList: React.FC<Props> = ({ users }) => {

    return (
        <section className="who-to-follow card">
            <h2 className='card-title'>Who to follow</h2>
            <ul role='list' className="users-to-follow">
                {(!users.length) ?
                    <div className="no-users-to-follow">No users to add!</div>
                    :
                    users?.map(user => <WhoToFollowPreview key={user._id} user={user} />)
                }
            </ul>
        </section>

    )
}