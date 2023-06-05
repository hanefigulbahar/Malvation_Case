import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BaseContainer from "../container/BaseContainer";

const Layout = () => {
  return (
    <div className="dark:bg-gray-600">
      <Header />
      <div className="flex">
        <SideBar />
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
