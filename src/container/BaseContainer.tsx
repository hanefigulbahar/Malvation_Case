import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
interface IBaseContainer {
  children: React.ReactNode;
}
const BaseContainer = ({ children }: IBaseContainer) => {
  const location = useLocation();
  console.log(location.pathname.length);
  const goBackGHandle = () => window.history.back();
  return (
    <div className="flex flex-col gap-5 border border-gray-100 m-5 p-10 w-full shadow-md rounded-xl bg-gray-50">
      <div className="border border-gray-100 p-6 bg-white rounded-xl shadow-md">
        {location.pathname.length <= 1 ? (
          <div className="flex justify-start items-center gap-2 p-3 rounded-lg">
            <p className="text-2xl font-semibold text-gray-500">Users</p>
          </div>
        ) : (
          <button
            onClick={goBackGHandle}
            className="flex justify-center items-center gap-2 hover:bg-gray-50 p-3 rounded-lg">
            <div className="text-xl">
              <BsArrowLeft />
            </div>
            <p>Go Back</p>
          </button>
        )}
      </div>
      <div className="border border-gray-100 p-10 bg-white rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default BaseContainer;
