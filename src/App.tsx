import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'
import AppHeader from './components/AppHeader'
// import routes from ''

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/*" element={<Home />} />
        {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
      </Routes>
    </>
  )
}

export default App
