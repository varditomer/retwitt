import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './components/AppHeader'
import routes from './routes'
import { Footer } from './components/Footer'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { INITIAL_STATE, UserState } from './interfaces/state.interface'
import { AnyAction } from 'redux'
import { useEffect } from 'react'
import { loadLoggedinUser, loadUsers } from './store/actions/user.action'
import { loadTweets } from './store/actions/tweet.action'
import { useSelector } from 'react-redux'


const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()
  useEffect(() => {
    dispatch(loadUsers())
    dispatch(loadLoggedinUser())
    dispatch(loadTweets())
  }, [])

  const loggedinUser = useSelector((state: UserState) => state.userModule.loggedinUser)

  // if (!loggedinUser) return <div>Loading...</div>
  return (
    <section className='main-app'>
      {loggedinUser ? <AppHeader loggedinUser={loggedinUser} /> : ''}
      {/* <AppHeader loggedinUser={loggedinUser} /> */}
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
      {loggedinUser ? <Footer /> : ''}
      {/* <Footer /> */}
    </section>
  )
}

export default App
