// Settings
import './assets/styles/main.scss'
import { routes, privateRoutes } from './routes'
import { PrivateRoute } from './PrivateRoute'
// React / Redux
import { Route, Routes } from 'react-router-dom'
import { AnyAction } from 'redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSelector } from 'react-redux'
// Interfaces
import { INITIAL_STATE, UserState } from './interfaces/state.interface'
// Actions
import { loadLoggedinUser, loadUsers } from './store/actions/user.action'
import { loadHashtags, loadTweets } from './store/actions/tweet.action'
// Components
import { AppHeader } from './components/app-general_cmps/AppHeader'
import { AppFooter } from './components/app-general_cmps/AppFooter'


const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()
  useEffect(() => {
    dispatch(loadUsers())
    dispatch(loadLoggedinUser())
    dispatch(loadTweets())
    dispatch(loadHashtags())
  }, [])

  const loggedinUser = useSelector((state: UserState) => state.userModule.loggedinUser)
  const isAuthenticated = true // TODO: replace with your authentication logic
  const redirectTo = "/login" // TODO: replace with your desired redirect path

  return (
    <section className='main-app'>
      {loggedinUser ? <AppHeader loggedinUser={loggedinUser} /> : ''}
      <Routes>
        {routes.map(route => {
          if (route.children) {
            return <Route key={route.path} path={route.path} element={route.component}>
              {route.children.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
            </ Route>
          }
          return <Route key={route.path} element={route.component} path={route.path} />
        })}
        {privateRoutes.map(route => {
          if (route.children) {
            return <Route key={route.path} path={route.path} element={route.component}>
              {route.children.map((route, idx) => {
                return idx === 0 ?
                  <Route index key={route.path} element={route.component} />
                  :
                  <Route key={route.path} path={route.path} element={route.component} />
              })}
            </ Route>
          }
          return <Route key={route.path} element={route.component} path={route.path} />
        })}
        {/* {privateRoutes.map(route => {
          if (route.children) {
            return <Route key={route.path} path={route.path} element={
              <PrivateRoute
                path={route.path}
                element={route.component}
                isAuthenticated={isAuthenticated}
                redirectTo={redirectTo} />
            }>
              {route.children.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
            </ Route>
          }
          return <Route key={route.path} element={route.component} path={route.path} />
        })} */}
        {/* {privateRoutes.map(route => {
          if (route.children) {
            return <Route key={route.path} path={route.path} element={
              <PrivateRoute
                path={route.path}
                element={route.component}
                isAuthenticated={isAuthenticated}
                redirectTo={redirectTo} />
            }>
              {route.children.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
            </ Route>
          }
          return <Route key={route.path} path={route.path} element={
            <PrivateRoute
              path={route.path}
              element={route.component}
              isAuthenticated={isAuthenticated}
              redirectTo={redirectTo} />
            }
          />
        })} */}
        {/* {privateRoutes.map(route => {
          console.log(`route:`, route)
          if (route.children) {
            return <Route key={route.path} element={
              <PrivateRoute isAuthenticated={isAuthenticated} redirectTo={redirectTo} path={route.path} element={route.component}>
                {route.children.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
              </ PrivateRoute>
            }>
            </Route>
          }
          return <Route key={route.path} element={
            <PrivateRoute isAuthenticated={isAuthenticated} redirectTo={redirectTo} element={route.component} path={route.path} />
          }>
          </Route>
        })} */}
      </Routes>
      {loggedinUser ? <AppFooter /> : ''}
    </section >
  )
}

export default App
