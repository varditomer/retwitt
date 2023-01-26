import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'
import { AppHeader } from './components/AppHeader'
import { Footer } from './components/Footer'
import routes from './routes'

const App: React.FC = () => {
  return (
    <section className='main-app'>
      <AppHeader />
      <Routes>
        {routes.map(route => {
          console.log(`route:`, route)
          if (route.children) {
            return <Route key={route.path} element={route.component} path={route.path}>
              {route.children.map(route => {
                return <Route key={route.path} element={route.component} path={route.path} />
              })}
            </ Route>
          }
          return <Route key={route.path} element={route.component} path={route.path} />
        })}
      </Routes>
      <Footer />
    </section>
  )
}

export default App
