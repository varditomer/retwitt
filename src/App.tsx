import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'
import { AppHeader } from './components/AppHeader'
import { Footer } from './components/Footer'
// import routes from ''

const App: React.FC = () => {
  return (
    <section className='main-app'>
      <AppHeader />
      <Routes>
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/*" element={<Home />} />
        {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
      </Routes>
      <Footer />
    </section>
  )
}

export default App
