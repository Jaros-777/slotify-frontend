import { Outlet } from "react-router-dom";
import { NavbarHome } from "./components/Navbar/NavbarHome";
import { Footer } from "./components/Footer/Footer";

export const HomeLayout = () => {
    return (
        <>
            <NavbarHome />
            <Outlet />
            <Footer/>
        </>
    );
};
