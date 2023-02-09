import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { TweetState, UserState } from '../interfaces/state.interface';
import { Tweet } from '../interfaces/tweet.interface';


export const Bookmark: React.FC = () => {

  const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
  const {users, loggedinUser} = useSelector((state: UserState) => state.userModule)

  const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)
  const [userLikedTweets, setUserLikedTweets] = useState<Tweet[] | null>(null)


  useEffect(() => {
    if (!loggedinUser || !tweets) return
    const savedTweets = tweets.filter(tweet => loggedinUser.savedTweets.includes(tweet._id!))
    setTweetsToShow(savedTweets)
    const selectedUserLikedTweets = tweets.filter(tweet => tweet.likes.includes(loggedinUser._id))
    setUserLikedTweets(selectedUserLikedTweets)

  }, [loggedinUser, loggedinUser?.savedTweets, tweets])


  return (
    <section className="bookmark page">
      <div className="small-area">
        <section className="tweets-filter card">
          <ul role='list'>
            <li>
              <div className="border"></div>
              <NavLink to='tweets'>
                <span className="filter-title">Tweets</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='tweets_replies'>
                <span className="filter-title">Tweets & replies</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='media'>
                <span className="filter-title">Media</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='likes'>
                <span className="filter-title">Likes</span>
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
      <div className="large-area">
        <Outlet
          context={{
            tweetsToShow,
            loggedinUser,
            users,
            userLikedTweets
          }}
        />
      </div>
    </section>
  )
}