// React / Redux
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Interfaces
import { TweetState, UserDetailsContext, UserState } from '../interfaces/state.interface'
import { Tweet, TweetsFilter } from '../interfaces/tweet.interface'
// Components
import { SearchTweet } from '../components/tweet_cmps/SearchTweet'
import { Loader } from '../components/app-general_cmps/Loader'
import { TweetsFilters } from '../components/app-general_cmps/TweetsFilters'


export const Explore: React.FC = () => {

  const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)
  const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)

  const [tweetsToExplore, setTweetsToExplore] = useState<Tweet[]>([])
  const [filteredTweetsToExplore, setFilteredTweetsToExplore] = useState<Tweet[]>([])

  const [searchTweetBy, setSearchTweetBy] = useState('')


  const tweetsFilters: TweetsFilter[] = [
    { title: 'Top', to: '', },
    { title: 'Latest', to: 'latest', },
    { title: 'People', to: 'people', },
    { title: 'Media', to: 'media', },
  ]

  const pathnameTarget = '/explore'

  const onChangeSearchTweetBy = (query: string) => {
    setSearchTweetBy(query)
  }

  useEffect(() => {
    if (!tweets?.length || !loggedinUser) return

    const unFollowsUsers = users.filter(user => !loggedinUser.follows.includes(user._id) && user._id !== loggedinUser._id)
    const unFollowsUsersIds = unFollowsUsers.map(user => user._id)
    const unFollowsUsersTweets = tweets.filter(tweet => unFollowsUsersIds.includes(tweet.createdBy))

    setTweetsToExplore(unFollowsUsersTweets)

  }, [tweets, loggedinUser, loggedinUser?.follows])

  useEffect(() => {
    if (!tweetsToExplore.length) {
      return setFilteredTweetsToExplore([])
    }
    const tweets: Tweet[] = structuredClone(tweetsToExplore)
    const regex = new RegExp(searchTweetBy, 'i')
    const filteredTweets = tweets.filter(tweet => regex.test(tweet.content))
    setFilteredTweetsToExplore(structuredClone(filteredTweets))
  }, [tweetsToExplore, searchTweetBy])




  if (!tweetsToExplore || !users || !loggedinUser) return (
    <section className="page loading">
      <Loader />
    </section>
  )

  return (
    <section className="explore page">
      <TweetsFilters
        pathnameTarget={pathnameTarget}
        tweetsFilters={tweetsFilters}
      />
      <div className="large-area">
        {<SearchTweet searchTweetBy={searchTweetBy} onChangeSearchTweetBy={onChangeSearchTweetBy} />}

        <Outlet
          context={{
            tweetsToShow: filteredTweetsToExplore,
            loggedinUser,
            users,
            title: 'Explore'
          } as UserDetailsContext}
        />

      </div>
    </section>
  )
}