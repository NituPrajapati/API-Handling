import { Outlet } from "react-router-dom";
import {Footer} from "./Footer";
import {Navbar} from "./Navbar";

export const MainLayout = () => {
return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
);
};

export default MainLayout;