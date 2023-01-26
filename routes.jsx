import { Home } from './src/views/Home'
import { Bookmarks } from './src/views/Bookmarks'
import { Explore } from './src/views/Explore'

const routes = [
    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/explore",
        component: <Explore />,
    },
    {
        path: "/bookmarks",
        component: <Bookmarks />,
    }
]

export default routes


