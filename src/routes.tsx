// Views:
import { Home } from './views/Home'
import { Bookmark } from './views/Bookmark'
import { Explore } from './views/Explore'
import { UserDetails } from './views/UserDetails'

// Components:
import { Tweets } from './components/general_cmps/Tweets'
import { TweetsAndReplies } from './components/general_cmps/TweetsAndReplies'
import { Media } from './components/general_cmps/Media'
import { Likes } from './components/general_cmps/Likes'
import { Top } from './components/general_cmps/Top'
import { People } from './components/general_cmps/People'
import { LandingPage } from './views/LandingPage'





const routes = [
    {
        path: "/",
        component: <LandingPage />,
    },
    // {
    //     path: "/",
    //     component: <Home />,
    // },
    {
        path: "/home",
        component: <Home />,
    },
    {
        path: "/home/:id",
        component: <UserDetails />,
        children: [
            {
                path: "/home/:id/tweets",
                component: <Tweets />,
            },
            {
                path: "/home/:id/tweets_replies",
                component: <TweetsAndReplies />,
            },
            {
                path: "/home/:id/media",
                component: <Media />,
            },
            {
                path: "/home/:id/likes",
                component: <Likes />,
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
                component: <Tweets />,
            },
            {
                path: "/explore/people",
                component: <People />,
            },
            {
                path: "/explore/media",
                component: <Media />,
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
                component: <TweetsAndReplies />,
            },
            {
                path: "/bookmark/media",
                component: <Media />,
            },
            {
                path: "/bookmark/likes",
                component: <Likes />,
            }
        ]
    }
]

export default routes


