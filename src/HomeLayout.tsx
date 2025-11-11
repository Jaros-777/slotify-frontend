import { Outlet } from "react-router-dom";
import { NavbarHome } from "./components/Navbar/NavbarHome";
import { FooterHome } from "./components/Footer/FooterHome";

export const HomeLayout = () => {
    return (
        <>
            <NavbarHome />
            <Outlet />
            <FooterHome/>
        </>
    );
};
