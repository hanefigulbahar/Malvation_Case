import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { isLoading } from "../features/loadingSlice";
import { request } from "../service/request";
import { allData } from "../features/usersSlice";
import { Toaster } from "react-hot-toast";
interface IBaseContainer {
  children: React.ReactNode;
}
const BaseContainer = ({ children }: IBaseContainer) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const page = useAppSelector((state) => state.pagination.page);

  const fetchData = async (page: number) => {
    const users = await request(
      `http://localhost:3000/users?_page=${page}`,
      "GET"
    );
    dispatch(allData(users));
    dispatch(isLoading(false));
  };
  useEffect(() => {
    dispatch(isLoading(true));
    fetchData(page);
  }, [dispatch, page]);

  const goBackGHandle = () => window.history.back();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col gap-5 border border-gray-100 m-5 p-10 w-full shadow-md rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="border border-gray-100 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700">
          {location.pathname.length <= 1 ? (
            <div className="flex justify-start items-center gap-2 p-3 rounded-lg">
              <p className="text-2xl font-semibold text-gray-500 dark:text-gray-50">
                Users
              </p>
            </div>
          ) : (
            <button
              onClick={goBackGHandle}
              className="flex justify-center items-center gap-2 hover:bg-gray-50 p-3 rounded-lg dark:hover:bg-gray-700 dark:text-gray-50">
              <div className="text-xl">
                <BsArrowLeft />
              </div>
              <p>Go Back</p>
            </button>
          )}
        </div>
        <div className="border border-gray-100 p-10 bg-white rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-800">
          {children}
        </div>
        {location.pathname.length <= 1 && <Pagination />}
      </div>
    </>
  );
};

export default BaseContainer;
