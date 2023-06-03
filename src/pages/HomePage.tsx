import { useAppSelector } from "../store/hooks";

import { Navigate } from "react-router-dom";

import UserList from "../components/UserList";
import Loading from "../components/Loading";

function HomePage() {
  const authUserToken = useAppSelector((state) => state.autUser.accessToken);
  const loading = useAppSelector((state) => state.loading.isLoading);

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
