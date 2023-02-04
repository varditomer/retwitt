import { Home } from './views/Home'
import { Bookmark } from './views/Bookmark'
import { Explore } from './views/Explore'
import { UserDetails } from './views/UserDetails'


import { Top } from './components/explore_cmps/Top'
import { Latest } from './components/explore_cmps/Latest'
import { People } from './components/explore_cmps/People'
import { Media as ExploreMedia } from './components/explore_cmps/Media'

import { Media as BookmarkMedia } from './components/bookmark_cmps/Media'
import { Tweets } from './components/bookmark_cmps/Tweets'
import { Replies } from './components/bookmark_cmps/Replies'
import { Likes } from './components/bookmark_cmps/Likes'

import { Tweets as UserDetailsTweets } from './components/user-details_cmps/Tweets'
import { Replies as UserDetailsReplies } from './components/user-details_cmps/Replies'
import { Media as UserDetailsMedia } from './components/user-details_cmps/Media'
import { Likes as UserDetailsLikes } from './components/user-details_cmps/Likes'

import { Media as GeneralMedia } from './components/general_cmps/Media'

const routes = [
    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/home/:id",
        component: <UserDetails />,
        children: [
            {
                path: "/home/:id/tweets",
                component: <UserDetailsTweets />,
            },
            {
                path: "/home/:id/tweets_replies",
                component: <UserDetailsReplies />,
            },
            {
                path: "/home/:id/media",
                component: <GeneralMedia />,
            },
            {
                path: "/home/:id/likes",
                component: <UserDetailsLikes />,
            }
        ]
    },
    
    {
        path: "/explore",
        component: <Explore />,
        children: [
            {
                path: "/explore/top",
                component: <Top />,
            },
            {
                path: "/explore/latest",
                component: <Latest />,
            },
            {
                path: "/explore/people",
                component: <People />,
            },
            {
                path: "/explore/media",
                component: <GeneralMedia />,
            }
        ]
    },
    {
        path: "/bookmark",
        component: <Bookmark />,
        children: [
            {
                path: "/bookmark/tweets",
                component: <Tweets />,
            },
            {
                path: "/bookmark/tweets_replies",
                component: <Replies />,
            },
            {
                path: "/bookmark/media",
                component: <GeneralMedia />,
            },
            {
                path: "/bookmark/likes",
                component: <Likes />,
            }
        ]
    }
]

export default routes


