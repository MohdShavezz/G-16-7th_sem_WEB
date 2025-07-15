import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import About from './pages/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Contact from './pages/Contact'
import NoPage from './pages/NoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Header/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
