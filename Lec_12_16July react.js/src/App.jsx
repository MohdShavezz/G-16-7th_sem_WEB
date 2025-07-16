import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './pages/Form';
import User from './pages/User';
import Home from './pages/Home';
import Header from './Header';

function App() {

  return (
    <>
      <BrowserRouter>
       <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
