import { useEffect } from "react";
import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { allData } from "../features/usersSlice";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserList from "../components/UserList";

function HomePage() {
  const dispatch = useAppDispatch();
  const authUserToken = useAppSelector((state) => state.autUser.accessToken);
  const page = useAppSelector((state) => state.pagination.page);

  const fetchData = async (page: number) => {
    const users = await request(
      `http://localhost:3000/users?_page=${page}`,
      "GET"
    );

    dispatch(allData(users));
  };
  useEffect(() => {
    fetchData(page);
  }, [dispatch, page]);

  return (
    <>
      {authUserToken ? (
        <>
          <div className="flex justify-center items-center w-full">
            <Toaster position="top-right" reverseOrder={false} />
            <UserList />
          </div>
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export { HomePage };
