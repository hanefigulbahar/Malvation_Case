import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeTheme } from "../features/themeSlice";
import { useEffect, useState } from "react";
import {
  TbLayoutDashboard,
  TbLogout,
  TbMoonStars,
  TbSunHigh,
} from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { themeChanger } from "../utils/themaChanger";

const SideBar = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const toggleHamburger = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  const logoutHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("status");
    navigate("/login");
  };

  useEffect(() => {
    themeChanger();
  }, []);

  const themeChangeHandle = (value: boolean) => {
    dispatch(changeTheme(value));
  };
  return (
    <aside
      id="default-sidebar"
      className="w-max sticky top-0 h-screen text-center"
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-3 font-medium">
          <li className="flex justify-start">
            <button
              onClick={toggleHamburger}
              type="button"
              className="inline-flex items-baseline p-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-solid-bg"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </li>
          <li>
            <NavLink
              to={"/"}
              className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex justify-center items-center">
                <div className="text-2xl">
                  <TbLayoutDashboard />
                </div>
                <span
                  className={
                    hamburgerMenu
                      ? "hidden"
                      : "flex-1 ml-3 whitespace-nowrap px-3 hidden md:inline "
                  }>
                  Dashboard
                </span>
              </div>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => themeChangeHandle(theme === "dark" ? false : true)}
              className="p-3 text-gray-900 w-full rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              {theme === "dark" ? (
                <div className="flex items-center justify-between text-left ">
                  <div className="text-2xl">
                    <TbSunHigh />
                  </div>
                  <span
                    className={
                      hamburgerMenu
                        ? "hidden"
                        : "flex-1 ml-3 whitespace-nowrap px-3 hidden md:inline "
                    }>
                    Light
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-left">
                  <div className="text-2xl">
                    <TbMoonStars />
                  </div>
                  <span
                    className={
                      hamburgerMenu
                        ? "hidden"
                        : "flex-1 ml-3 whitespace-nowrap px-3 hidden md:inline "
                    }>
                    Dark
                  </span>
                </div>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={logoutHandle}
              className="flex justify-start p-3 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex justify-center items-center">
                <div className="text-2xl">
                  <TbLogout />
                </div>
                <span
                  className={
                    hamburgerMenu
                      ? "hidden"
                      : "flex-1 ml-3 whitespace-nowrap px-3 hidden md:inline "
                  }>
                  Sign out
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
