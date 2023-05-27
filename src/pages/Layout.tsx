import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <div className="flex w-full">
        <Header />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
