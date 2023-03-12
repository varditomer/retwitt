// React / Redux
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Loader } from '../components/app-general_cmps/Loader'
// Interfaces
import { TweetState, UserState } from '../interfaces/state.interface'
// Actions
import { Tweet, TweetsFilter } from '../interfaces/tweet.interface'
// Components
import { TweetsFilters } from '../components/app-general_cmps/TweetsFilters'


export const Bookmark: React.FC = () => {

  const tweets = useSelector((state: TweetState) => state.tweetModule.tweets)
  const { users, loggedinUser } = useSelector((state: UserState) => state.userModule)

  const [tweetsToShow, setTweetsToShow] = useState<Tweet[] | null>(null)
  const [userLikedTweets, setUserLikedTweets] = useState<Tweet[] | null>(null)
  const [userRepliedTweets, setUserRepliedTweets] = useState<Tweet[] | null>(null)

  const tweetsFilters: TweetsFilter[] = [
    { title: 'Tweets', to: '', },
    { title: 'Tweets & replies', to: 'tweets_replies', },
    { title: 'Media', to: 'media', },
    { title: 'Likes', to: 'likes', },
  ]

  const pathnameTarget = `/bookmark`

  useEffect(() => {

    if (!loggedinUser || !tweets) return

    const savedTweets = tweets.filter(tweet => loggedinUser.savedTweets.includes(tweet._id!))
    setTweetsToShow(savedTweets)


    const selectedUserLikedTweets = tweets.filter(tweet => tweet.likes?.includes(loggedinUser._id))
    setUserLikedTweets(selectedUserLikedTweets)

    const tweetsToFilter: Tweet[] = structuredClone(tweets)

    // This code filter & make shallow copy (breaks only tweets pointers but not inner replies pointers) 
    // of tweets by tweets that the loggedin user replied on them.
    const selectedUserRepliedTweets = tweetsToFilter.filter(tweet => tweet.replies?.some(reply => reply.createdBy === loggedinUser._id))
    // But next I want to remove others users's replies on them,
    // but because filter method only makes a shallow copy
    // this manipulation will filter others users's replies from the original tweets.
    // So i'm working from the start on structredClone of the original tweets
    selectedUserRepliedTweets.forEach(tweet => tweet.replies = tweet.replies?.filter(reply => {
      return reply.createdBy === loggedinUser._id
    }))

    setUserRepliedTweets(selectedUserRepliedTweets)



  }, [loggedinUser, loggedinUser?.savedTweets, tweets])

  if (!loggedinUser) return (
    <section className="page loading">
      <Loader />
    </section>
  )

  return (
    <section className="bookmark page">
      <TweetsFilters
        pathnameTarget={pathnameTarget}
        tweetsFilters={tweetsFilters}
      />
      <div className="large-area">
        <Outlet
          context={{
            tweetsToShow,
            loggedinUser,
            users,
            userLikedTweets,
            userRepliedTweets
          }}
        />
      </div>
    </section>
  )
}