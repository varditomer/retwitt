import { Route, Routes } from 'react-router-dom'
import './assets/styles/main.scss'
import { AppHeader } from './components/AppHeader'
import routes from './routes'
import { Footer } from './components/Footer'

const App: React.FC = () => {
  return (
    <section className='main-app'>
      <AppHeader />
      <Routes>
        {routes.map(route => {
          if (route.children) {
            return <Route key={route.path} path={route.path} element={route.component}>
              {route.children.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
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
