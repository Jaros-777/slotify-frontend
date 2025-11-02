import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import { Auth } from './pages/Home/components/Auth/Auth.tsx';
import { NavbarHome } from './components/Navbar/NavbarHome.tsx';
import { NavbarAdmin } from "./components/Navbar/NavbarAdmin.tsx";
import { CalendarPage } from "./pages/Admin/components/Calendar/CalendarPage.tsx";
import { Settings } from "./pages/Admin/components/Settings/Settings.tsx";
import { Footer } from './components/Footer/Footer.tsx';
import { NotFound } from "./pages/NotFound.tsx";
import type { ServiceType } from "./pages/Admin/components/Calendar/components/types/ServiceType.ts";
import { createContext, useContext, useState, type ReactNode } from "react";


interface DataContextType {
  userToken: string | null,
  setUserToken: (t:string | null) => void
  serviceData: ServiceType[]
  setServiceData: (t:ServiceType[]) => void
  isLogged: boolean
  setIsLogged: (t:boolean) => void
}

const DataContext = createContext<DataContextType>({
  userToken: null,
  setUserToken:() => {},
  serviceData: [],
  setServiceData:() => {},
  isLogged: false,
  setIsLogged: ()=>{}
})


export const AppRouter = ({}: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>("")
  const [serviceData, setServiceData] = useState<ServiceType[]>([])
  const [isLogged, setIsLogged] = useState<boolean>(false)


  const location = useLocation();

  const navbar = location.pathname.startsWith("/admin") ? <NavbarAdmin /> : <NavbarHome />;

  const footer = location.pathname.startsWith("/admin") ? null : <Footer />

  return (
    <DataContext.Provider value={{ userToken, setUserToken, serviceData, setServiceData, isLogged, setIsLogged }}>
      {navbar}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth view="login" />} />
        <Route path="/register" element={<Auth view="register" />} />
        <Route path="/admin/calendar" element={<CalendarPage />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/*" element={<NotFound />} />
      </Routes >
      {footer}
    </DataContext.Provider >
  );
};
export const useData = () => useContext(DataContext); 