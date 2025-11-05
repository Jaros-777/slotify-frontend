import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import { Auth } from './pages/Home/components/Auth/Auth.tsx';
import { AdminLayout } from "./AdminLayout.tsx";
import { HomeLayout } from "./HomeLayout.tsx";
import { SettingsLayout } from "./SettingsLayout.tsx";
import { CalendarPage } from "./pages/Admin/components/Calendar/CalendarPage.tsx";
import { Settings } from "./pages/Admin/components/Settings/Settings.tsx";
import { Services } from "./pages/Admin/components/Settings/components/Service/Services.tsx";
import { ServiceForm } from "./pages/Admin/components/Settings/components/Service/components/ServiceForm.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import type { ServiceType } from "./pages/Admin/components/Calendar/components/types/ServiceType.ts";
import { createContext, useContext, useState, type ReactNode } from "react";


interface DataContextType {
  userToken: string | null,
  setUserToken: (t: string | null) => void
  serviceData: ServiceType[]
  setServiceData: (t: ServiceType[]) => void
  isLogged: boolean
  setIsLogged: (t: boolean) => void
}

const DataContext = createContext<DataContextType>({
  userToken: null,
  setUserToken: () => { },
  serviceData: [],
  setServiceData: () => { },
  isLogged: false,
  setIsLogged: () => { }
})


export const AppRouter = ({ }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>("")
  const [serviceData, setServiceData] = useState<ServiceType[]>([])
  const [isLogged, setIsLogged] = useState<boolean>(false)

  return (
    <DataContext.Provider value={{ userToken, setUserToken, serviceData, setServiceData, isLogged, setIsLogged }}>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth view="login" />} />
          <Route path="/register" element={<Auth view="register" />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/calendar" element={<CalendarPage />} />
          <Route element={<SettingsLayout />}>
            <Route path="/admin/settings/services" element={<Services />} />
            <Route path="/admin/settings/services/form/:id" element={<ServiceForm />} />
          </Route>


        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes >
    </DataContext.Provider >
  );
};
export const useData = () => useContext(DataContext); 