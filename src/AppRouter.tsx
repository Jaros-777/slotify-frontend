import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import { Auth } from './pages/Home/components/Auth/Auth.tsx';
import { NavbarHome } from './components/Navbar/NavbarHome.tsx';
import { NavbarAdmin } from "./components/Navbar/NavbarAdmin.tsx";
import { Admin } from "./pages/Admin/admin.tsx";
import { Footer } from './components/Footer/Footer.tsx';

export const AppRouter = () => {
  const location = useLocation();

  const navbar =
    location.pathname.startsWith("/admin") ? <NavbarAdmin /> : <NavbarHome />;

  return (
    <>
      {navbar}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth view="login" />} />
        <Route path="/register" element={<Auth view="register" />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  );
};
