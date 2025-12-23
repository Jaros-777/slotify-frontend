import { Outlet } from "react-router-dom";
import { NavBarClient } from "./components/Navbar/NavBarClient";
import { FooterReservation } from "./components/Footer/FooterReservation";

export const ClientPanelLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBarClient type="panel" />
            <div className="flex flex-col flex-1 justify-between">
                <Outlet />
                <FooterReservation />
            </div>
        </div>
    );
};
