import { useEffect } from "react";
import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { allData } from "../features/usersSlice";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserList from "../components/UserList";

function HomePage() {
  const dispatch = useAppDispatch();
  const autUserStatus = useAppSelector((state) => state.autUser.data.isAut);
  console.log(autUserStatus);
  useEffect(() => {
    const fetchData = async () => {
      const users = await request("http://localhost:3000/users", "GET");
      dispatch(allData(users));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {autUserStatus === true ? (
        <>
          <Toaster position="top-right" />
          <UserList />
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export { HomePage };
