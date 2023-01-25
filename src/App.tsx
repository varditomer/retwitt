import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import { Home } from './views/Home'
import { Bookmarks } from './views/Bookmarks'
import { Explore } from './views/Explore'

const App: React.FC = () => {
  return (
    <Routes>
      {/* <div className="App"> */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/" element={<Home />} />
      {/* </div> */}
    </Routes>
  )
}

export default App
