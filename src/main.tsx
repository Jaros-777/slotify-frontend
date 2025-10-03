import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home/Home.tsx'
import { Auth } from './pages/Auth/Auth.tsx';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { Footer } from './components/Footer/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth  view='login'/>} />
      <Route path="/register" element={<Auth  view='register'/>} />
    </Routes>
    <Footer/>

  </BrowserRouter>,
)
