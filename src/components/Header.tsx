import { useState } from "react";
import { useAppSelector } from "../store/hooks";

const Header = () => {
  const [navbarDropdown, setNavbarDropdown] = useState(false);
  const { user } = useAppSelector((state) => state.autUser.user);

  const navbarDropdownHandle = () => {
    setNavbarDropdown(!navbarDropdown);
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="#"
          className="flex items-center bg-sky-600 dark:bg-sky-800 rounded-lg">
          <img
            src="https://malwation.com/wp-content/uploads/2021/10/logo_white.png"
            className="h-5 m-3 "
            alt="Malwation Logo"
          />
        </a>
        <div className="block" id="navbar-solid-bg">
          <ul className="flex justify-center items-center font-medium rounded-lg bg-gray-50 flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0 dark:text-white md:dark:hover:text-sky-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0 dark:text-white md:dark:hover:text-sky-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                About
              </a>
            </li>
            <li>
              <div className="flex relative items-center md:order-2">
                <button
                  onClick={navbarDropdownHandle}
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.user?.image}
                    alt="user photo"
                  />
                </button>
                <div
                  className={
                    navbarDropdown
                      ? "absolute top-10 right-0 z-50 my-4 text-base list-none bg-gray-50 divide-y divide-gray-100 rounded-lg .shadow dark:bg-gray-700 dark:divide-gray-600"
                      : "hidden"
                  }
                  id="user-dropdown">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.user?.firstName + " " + user.user?.lastName}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {user.user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-200 dark:hover:text-white">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-200 dark:hover:text-white">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
