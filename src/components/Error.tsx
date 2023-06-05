import AnimationErrorLight from "../assets/ErrorLight.gif";
import AnimationErrorDark from "../assets/ErrorDark.gif";
import Error404Light from "../assets/404PageLight.gif";
import Error404Dark from "../assets/404PageDark.gif";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
interface IErrorComponent {
  status: number;
}

const Error = ({ status }: IErrorComponent) => {
  const theme = useAppSelector((state) => state.theme.theme);
  switch (status) {
    case 404:
      return (
        <div className="space-y-4 relative h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-500 dark:text-white text-3xl font-medium">
            Opss...Are you lost?
          </p>

          <img src={theme === "dark" ? Error404Dark : Error404Light} alt="" />
          <p className="text-gray-500 dark:text-white text-3xl font-medium">
            Page Not Found!
          </p>
          <Link
            to={"/"}
            className="text-gray-100 dark:text-white text-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
            Go Home
          </Link>
        </div>
      );

    default:
      return (
        <div className="space-y-4 relative h-screen flex flex-col justify-center font-medium items-center bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-500 dark:text-white text-3xl">
            Someting Wrong!!
          </p>
          <img
            src={theme === "dark" ? AnimationErrorDark : AnimationErrorLight}
            alt=""
          />
          <Link
            to={"/"}
            className="text-gray-100 dark:text-white text-lg  bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
            Go Home
          </Link>
        </div>
      );
  }
};

export default Error;
