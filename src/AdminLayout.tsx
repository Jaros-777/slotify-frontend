import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "./components/Navbar/NavbarAdmin";

export const AdminLayout = () => {
    return (
        <>
            <NavbarAdmin />
            <div className="pt-20 h-full">
                <Outlet />
            </div>

        </>
    );
};
