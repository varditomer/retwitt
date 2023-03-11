// React / Redux
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Interfaces
import { TweetState, UserState } from '../interfaces/state.interface'
import { Tweet } from '../interfaces/tweet.interface'
// Components
import { SearchTweet } from '../components/tweet_cmps/SearchTweet'
import { Loader } from '../components/app-general_cmps/Loader'


export const Explore: React.FC = () => {

  const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
  const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)

  const [tweetsToExplore, setTweetsToExplore] = useState<Tweet[] | null>(null)
  const [filteredTweetsToExplore, setFilteredTweetsToExplore] = useState<Tweet[] | null>(null)

  const [searchTweetBy, setSearchTweetBy] = useState('')

  const onChangeSearchTweetBy = (query: string) => {
    setSearchTweetBy(query)
  }


  useEffect(() => {
    if (!tweets.length || !loggedinUser) return

    const unFollowsUsers = users.filter(user => !loggedinUser.follows.includes(user._id) && user._id !== loggedinUser._id)
    const unFollowsUsersIds = unFollowsUsers.map(user => user._id)
    const unFollowsUsersTweets = tweets.filter(tweet => unFollowsUsersIds.includes(tweet.createdBy))

    setTweetsToExplore(unFollowsUsersTweets)

  }, [tweets, loggedinUser])

  useEffect(() => {
    if (!tweetsToExplore) return
    const tweets: Tweet[] = JSON.parse(JSON.stringify(tweetsToExplore))
    const regex = new RegExp(searchTweetBy, 'i')
    const filteredTweets = tweets.filter(tweet => regex.test(tweet.content))
    setFilteredTweetsToExplore(JSON.parse(JSON.stringify(filteredTweets)))
  }, [tweetsToExplore, searchTweetBy])




  if (!tweetsToExplore || !users || !loggedinUser) return (
    <section className="page loading">
      <Loader />
    </section>
  )

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
        <SearchTweet searchTweetBy={searchTweetBy} onChangeSearchTweetBy={onChangeSearchTweetBy} />

        <Outlet
          context={{
            tweetsToShow: filteredTweetsToExplore,
            loggedinUser,
            users
          }}
        />

      </div>
    </section>
  )
}