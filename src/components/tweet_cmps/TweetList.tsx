import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { Tweet } from '../../interfaces/tweet.interface'
import { tweetService } from '../../services/tweet.service'
import { loadTweets } from '../../store/actions/tweet.action'
import { TWEET_STATE } from '../../store/reducers/tweet.reducer'
import { TweetState, UserState } from '../../interfaces/state.interface';
import { loadUsers } from '../../store/actions/user.action';
import { USER_STATE } from '../../store/reducers/user.reducer';
import { TweetPreview } from './TweetPreview';

type Props = {}

export const TweetList: React.FC<Props> = () => {
    const tweetDispatch = useDispatch<ThunkDispatch<TWEET_STATE, any, AnyAction>>()
    const userDispatch = useDispatch<ThunkDispatch<USER_STATE, any, AnyAction>>()
    const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
    const users = useSelector((state: UserState) => state.userModule.users)

    useEffect(() => {
        tweetDispatch(loadTweets())
        userDispatch(loadUsers())
    }, [])
    useEffect(() => {
        console.log(`tweets:`, tweets)
        console.log(`users:`, users)
    }, [])


    return (
        <section className="tweets-list">
            {tweets?.map((tweet: Tweet) =>
                <TweetPreview
                    key={tweet._id}
                    tweet={tweet}
                />
            )}
        </section>
    )
}