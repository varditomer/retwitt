import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'
import { Top } from './components/Top'
import { Latest } from './components/Latest'
import { People } from './components/People'
import { Media } from './components/Media'

const routes = [
    {
        path: "/",
        component: <Home />,
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
                component: <Media />,
            }
        ]
    },
    {
        path: "/bookmarks",
        component: <Bookmarks />,
    }
]

export default routes


