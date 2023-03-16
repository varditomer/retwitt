// React / Redux
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
// Interfaces
import { UserDetailsContext } from "../../interfaces/state.interface"
import { User } from "../../interfaces/user.interface"
// Components
import { WhoToFollowList } from "../who-to-follow_cmps/WhoToFollowList"


export const People: React.FC = () => {

    const { loggedinUser, users }: UserDetailsContext = useOutletContext()
    const [usersToExplore, setUsersToExplore] = useState<User[] | null>(null)


    useEffect(() => {
        if (!users.length || !loggedinUser) return

        const currUsersToExplore = users.filter(user => ((!loggedinUser?.follows.includes(user._id!)) && (!user.isGuest)) && (loggedinUser._id!==user._id))
        setUsersToExplore(currUsersToExplore)

    }, [users, loggedinUser])

    if (!usersToExplore) return <div>Loading...</div>

    if (!usersToExplore?.length) return (
        <section className="no-tweets-yet">
            <img alt="" className="no-tweets-img" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
            <h2 className="title">No people to explore 😢</h2>
            <h3 className="subtitle">Don’t let the good ones fly away! revisit later to see what's new.</h3>
        </section>
    )
    else return <WhoToFollowList users={usersToExplore} loggedinUser={loggedinUser} />

}