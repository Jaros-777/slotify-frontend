import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import { Auth } from './pages/Home/components/Auth/Auth.tsx';
import { NavbarHome } from './components/Navbar/NavbarHome.tsx';
import { NavbarAdmin } from "./components/Navbar/NavbarAdmin.tsx";
import { CalendarPage } from "./pages/Admin/components/Calendar/CalendarPage.tsx";
import { Footer } from './components/Footer/Footer.tsx';
import { NotFound } from "./pages/NotFound.tsx";

export const AppRouter = () => {
  const location = useLocation();

  const navbar =
    location.pathname.startsWith("/calendar") ? <NavbarAdmin /> : <NavbarHome />;

  return (
    <>
      {navbar}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth view="login" />} />
        <Route path="/register" element={<Auth view="register" />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};
