import { useEffect } from "react";
import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { allData } from "../features/usersSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function HomePage() {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.allData.users);

  const autUserStatus = useAppSelector((state) => state.autUser.isAut);
  const navigate = useNavigate();

  console.log(allUsers);

  useEffect(() => {
    const fetchData = async () => {
      const users = await request("http://localhost:3000/users", "GET");
      dispatch(allData(users));
    };
    fetchData();
  }, [dispatch]);

  const logoutHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("status");
    navigate("/login");
  };

  return (
    <>
      {autUserStatus === "true" ? (
        <>
          <Toaster position="top-right" />
          <div className="bg-red-400 w-full">
            {allUsers?.map((data) => (
              <div key={data.id}>{data.age}</div>
            ))}

            <button onClick={logoutHandle}>çık</button>
          </div>
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export { HomePage };
