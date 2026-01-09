import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import { Auth } from './pages/Home/components/Auth/Auth.tsx';

import { AdminLayout } from "./Layouts/AdminLayout.tsx";
import { HomeLayout } from "./Layouts/HomeLayout.tsx";
import { SettingsLayout } from "./Layouts/SettingsLayout.tsx";
import { BookingLayout } from "./Layouts/BookingLayout.tsx";
import { ClientPanelLayout } from "./Layouts/ClientPanelLayout.tsx";


import { CalendarPage } from "./pages/Admin/components/Calendar/CalendarPage.tsx";

import { Client } from "./pages/Admin/components/Client/Client.tsx";
import { ClientHistory } from "./pages/Admin/components/Client/component/ClientHistory.tsx";

import { GetBooking } from "./pages/Admin/components/Booking/components/GetBooking/GetBooking.tsx";
import { BookNowHTML } from "./pages/Admin/components/Booking/components/GetBooking/components/BookNowHTML.tsx";
import { BusinessProfile } from "./pages/Admin/components/Booking/components/BusinessProfile/BusinessProfile.tsx";

import { Availability } from "./pages/Admin/components/Settings/components/Availability/Availability.tsx";
import { Services } from "./pages/Admin/components/Settings/components/Service/Services.tsx";
import { ServiceForm } from "./pages/Admin/components/Settings/components/Service/components/ServiceForm.tsx";
import { Vacations } from "./pages/Admin/components/Settings/components/Vacations/Vacations.tsx";

import { Reservation } from "./pages/Clients/Reservation.tsx";
import { Order } from "./pages/Clients/components/Order/Order.tsx";

import { UserProfile } from "./pages/Clients/components/ClientPanel/ClientProfile.tsx";
import { ClientBookings } from "./pages/Clients/components/ClientPanel/ClientBookings.tsx";

import { NotFound } from "./pages/NotFound.tsx";

import type { ServiceType } from "./pages/Admin/components/types/ServiceType.ts";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ClientType } from "./pages/Clients/components/ClientPanel/types/clientType.ts";


interface DataContextType {
  userToken: string | null,
  setUserToken: (t: string | null) => void

  clientToken: string | null,
  setClientToken: (t: string | null) => void

  serviceData: ServiceType[]
  setServiceData: (t: ServiceType[]) => void

  isAdminLogged: boolean
  setIsAdminLogged: (t: boolean) => void

  isClientLogged: boolean
  setIsClientLogged: (t: boolean) => void

  clientDetails: ClientType | null
  setClientDetails: (t: ClientType | null) => void
}

const DataContext = createContext<DataContextType>({
  userToken: null,
  setUserToken: () => { },

  clientToken: null,
  setClientToken: () => { },

  serviceData: [],
  setServiceData: () => { },

  isAdminLogged: false,
  setIsAdminLogged: () => { },

  isClientLogged: false,
  setIsClientLogged: () => { },

  clientDetails: null,
  setClientDetails: () => { },
})


export const AppRouter = ({ }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>("")
  const [clientToken, setClientToken] = useState<string | null>("")
  const [serviceData, setServiceData] = useState<ServiceType[]>([])
  const [clientDetails, setClientDetails] = useState<ClientType | null>(null)
  const [isAdminLogged, setIsAdminLogged] = useState<boolean>(false)
  const [isClientLogged, setIsClientLogged] = useState<boolean>(false)

  return (
    <DataContext.Provider value={{ userToken, setUserToken, serviceData, setServiceData, isAdminLogged, setIsAdminLogged, clientToken, setClientToken, isClientLogged, setIsClientLogged,clientDetails, setClientDetails }}>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth view="login" />} />
          <Route path="/register/business" element={<Auth view="register" />} />
          <Route path="/register/personal" element={<Auth view="register" />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/calendar" element={<CalendarPage />} />
          <Route path="/admin/client" element={<Client />} />
          <Route path="/admin/client/:clientId" element={<ClientHistory />} />
          <Route element={<SettingsLayout />}>
            <Route path="/admin/settings/services" element={<Services />} />
            <Route path="/admin/settings/services/form/:id" element={<ServiceForm />} />
            <Route path="/admin/settings/services/form/add" element={<ServiceForm />} />
            <Route path="/admin/settings/availability" element={<Availability />} />
            <Route path="/admin/settings/vacations" element={<Vacations />} />
          </Route>
          <Route element={<BookingLayout />}>
            <Route path="/admin/booking/get-booking" element={<GetBooking />} />
            <Route path="/admin/booking/business-profile" element={<BusinessProfile />} />
          </Route>
        </Route>

        <Route path="/:businessName" element={<Reservation />} />
        <Route path="/:businessName/order/:serviceId" element={<Order />} />
        <Route path="/admin/get-button" element={<BookNowHTML />} />

        <Route element={<ClientPanelLayout />}>
          <Route path="/personal" element={<UserProfile />} />
          <Route path="/client-booking" element={<ClientBookings />} />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes >
    </DataContext.Provider >
  );
};
export const useData = () => useContext(DataContext); 