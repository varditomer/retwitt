import { useSelector } from 'react-redux';
import { TweetState, UserState } from '../interfaces/state.interface';
import { TweetList } from '../components/tweet_cmps/TweetList';
import SvgIcon from '../SvgIcon';
import { AddTweet } from '../components/tweet_cmps/AddTweet';
import { TrendList } from '../components/general_cmps/TrendList';
import { WhoToFollowList } from '../components/who-to-follow_cmps/WhoToFollowList';


export const Home: React.FC = () => {

    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const usersStore = useSelector((state: UserState) => state.userModule)

    if (!tweets || !usersStore.users || !usersStore.loggedinUser) return <div>Loading...</div>

    return (
        <section className="home page">

            <section className="large-area">
                <AddTweet loggedinUser={usersStore.loggedinUser} />
                <TweetList tweets={tweets} />

            </section>
            <div className="small-area">
                <TrendList />
                <WhoToFollowList users={usersStore.users} />
            </div>
        </section>
    )
}