import React, { useEffect, useState } from 'react'
import SvgIcon from '../SvgIcon';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TweetState, UserState } from '../interfaces/state.interface';
import { Tweet } from '../interfaces/tweet.interface';



type Props = {}

export const Explore: React.FC<Props> = () => {

  const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
  const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)

  const [tweetsToExplore, setTweetsToExplore] = useState<Tweet[] | null>(null)


  useEffect(() => {
    if (!tweets.length || !loggedinUser) return

    const unFollowsUsers = users.filter(user => !loggedinUser.follows.includes(user._id))
    const unFollowsUsersIds = unFollowsUsers.map(user => user._id)
    const unFollowsUsersTweets = tweets.filter(tweet => unFollowsUsersIds.includes(tweet.createdBy))

    setTweetsToExplore(unFollowsUsersTweets)

  }, [tweets, loggedinUser])


  if (!tweetsToExplore || !users || !loggedinUser) return <div>Loading...</div>

  return (
    <section className="explore page">
      <div className="small-area">
        <section className="tweets-filter card">
          <ul role='list'>
            <li>
              <div className="border"></div>
              <NavLink to='top'>
                <span className="filter-title">Top</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='latest'>
                <span className="filter-title">Latest</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='people'>
                <span className="filter-title">People</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='media'>
                <span className="filter-title">Media</span>
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
      <div className="large-area">
        <section className="search-tweet card">
          <SvgIcon iconName="search" wrapperStyle="search-icon" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
          <input type="text" placeholder='Search' className="search-input" />
          <button className="search-btn">Search</button>
        </section>

        <Outlet
          context={{
            tweetsToShow: tweetsToExplore,
            loggedinUser,
            users
          }}
        />

      </div>
    </section>
  )
}