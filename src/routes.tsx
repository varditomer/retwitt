import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'
import { Top } from './components/explore-components/Top'
import { Latest } from './components/explore-components/Latest'
import { People } from './components/explore-components/People'
import { Media as ExploreMedia } from './components/explore-components/Media'
import { Media as BookmarksMedia } from './components/bookmarks-components/Media'
import { Tweets } from './components/bookmarks-components/Tweets'
import { Replies } from './components/bookmarks-components/Replies'
import { Likes } from './components/bookmarks-components/Likes'
import { UserDetails } from './views/UserDetails'

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
                component: <Tweets />,
            },
            {
                path: "/home/:id/tweets_replies",
                component: <Replies />,
            },
            {
                path: "/home/:id/media",
                component: <BookmarksMedia />,
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
                component: <Latest />,
            },
            {
                path: "/explore/people",
                component: <People />,
            },
            {
                path: "/explore/media",
                component: <ExploreMedia />,
            }
        ]
    },
    {
        path: "/bookmarks",
        component: <Bookmarks />,
        children: [
            {
                path: "/bookmarks/tweets",
                component: <Tweets />,
            },
            {
                path: "/bookmarks/tweets_replies",
                component: <Replies />,
            },
            {
                path: "/bookmarks/media",
                component: <BookmarksMedia />,
            },
            {
                path: "/bookmarks/likes",
                component: <Likes />,
            }
        ]
    }
]

export default routes


