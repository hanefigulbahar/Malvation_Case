import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updatePage } from "../features/paginationSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pagination.page);
  const users = useAppSelector((state) => state.allData.users);

  const previousHandle = () => {
    page !== 1 && dispatch(updatePage(page - 1));
  };
  const nextHandle = () => {
    if (users?.length === 10) dispatch(updatePage(page + 1));
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white border dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-md rounded-xl">
      <button
        disabled={page === 1 && true}
        onClick={previousHandle}
        className="inline-flex w-28 justify-center items-center disabled:text-gray-200 disabled:hover:bg-white px-4 py-2 gap-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <div className="text-lg">
          <HiArrowNarrowLeft />
        </div>
        <p>Previous</p>
      </button>
      <div
        className="flex justify-center items-center w-28 border border-gray-50 bg-gray-100 text-gray-500  rounded-lg
       dark:border-gray-700 dark:bg-gray-700 dark:text-white">
        <p>{page}</p>
      </div>
      <button
        disabled={users?.length !== 10 && true}
        onClick={nextHandle}
        className="inline-flex w-28 justify-center  items-center disabled:text-gray-200 disabled:hover:bg-white px-4 py-2 gap-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <p>Next</p>
        <div className="text-lg">
          <HiArrowNarrowRight />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
