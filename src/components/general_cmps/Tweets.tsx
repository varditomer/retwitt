import { useOutletContext } from "react-router";
import { ReTwittContext } from "../../interfaces/state.interface";
import { TweetList } from "../tweet_cmps/TweetList";

export const Tweets: React.FC = () => { //tweets sorted by createdAt
    const { tweetsToShow, loggedinUser, users }: ReTwittContext = useOutletContext()
    return (
        <TweetList
            tweets={tweetsToShow}
            loggedinUser={loggedinUser}
            users={users}
        />
    )
}