import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import withAuth, { Protected } from './withAuth'

const EnhancedProfileAuth=withAuth(Profile)

const App = () => {
  return (
      <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">profile</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<EnhancedProfileAuth />} />
        {/* <Route path="/profile" element={<Protected><Profile /></Protected>} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
