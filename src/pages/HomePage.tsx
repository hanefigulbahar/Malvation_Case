import { useAppDispatch, useAppSelector } from "../store/hooks";

import { Navigate } from "react-router-dom";

import UserList from "../components/UserList";
import Loading from "../components/Loading";
import { request } from "../service/request";
import { allData } from "../features/usersSlice";
import { isLoading } from "../features/loadingSlice";
import { useEffect } from "react";

function HomePage() {
  const dispatch = useAppDispatch();

  const authUserToken = useAppSelector((state) => state.autUser.accessToken);
  const loading = useAppSelector((state) => state.loading.isLoading);
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
  }, [page]);
  return (
    <>
      {authUserToken ? (
        <>
          {loading ? (
            <div className="w-full h-screen p-4">
              <Loading />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full ">
              <UserList />
            </div>
          )}
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export { HomePage };
