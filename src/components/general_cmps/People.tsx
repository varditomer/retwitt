import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { UserDetailsContext } from "../../interfaces/state.interface";
import { User } from "../../interfaces/user.interface";

import { WhoToFollowList } from "../who-to-follow_cmps/WhoToFollowList";


export const People: React.FC = () => {

    const { loggedinUser, users }: UserDetailsContext = useOutletContext()
    const [usersToExplore, setUsersToExplore] = useState<User[] | null>(null)


    useEffect(() => {
        if (!users.length || !loggedinUser) return

        const currUsersToExplore = users.filter(user => ((!loggedinUser?.follows.includes(user._id!)) && (!user.isGuest)))
        setUsersToExplore(currUsersToExplore)

    }, [users, loggedinUser])

    if (!usersToExplore) return <div>Loading...</div>

    if (!usersToExplore?.length) return <>
        <img alt="" className="" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" />
        <span className="">Save Tweets for later</span>
        <span className="">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
    </>
    else return <WhoToFollowList users={usersToExplore} loggedinUser={loggedinUser} />

}