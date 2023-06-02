import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { allData } from "../features/usersSlice";
import { toast } from "react-hot-toast";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../features/loadingSlice";
import { useEffect } from "react";

const UserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allUsers = useAppSelector((state) => state.allData.users);

  const fetchData = async () => {
    const users = await request(`http://localhost:3000/users`, "GET");
    dispatch(allData(users));
    dispatch(isLoading(false));
  };

  const deleteUserHandle = async (id: number) => {
    dispatch(isLoading(true));
    const deleteStatus = await request(
      `http://localhost:3000/users/${id}`,
      "DELETE"
    );
    deleteStatus === 200
      ? toast.success("Deletion successful")
      : toast.error("Deletion failed");
    fetchData();
  };

  const linkHandler = (id: string) => {
    navigate(`users/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className="w-full px-4 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((data) => (
            <tr
              key={data.id}
              className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                onClick={() => linkHandler(data.id.toLocaleString())}
                scope="row"
                className="flex cursor-pointer items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img
                  className="w-10 h-10 rounded-full"
                  src={data.image}
                  alt={data.username}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">{`${data.firstName} ${data.lastName}`}</div>
                </div>
              </th>
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{data.phone}</td>
              <td className="px-6 py-4">{data.role.toLocaleUpperCase()}</td>
              <td className="px-6 py-4">
                {data.active === true ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Online
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                    Offline
                  </div>
                )}
              </td>
              <td className="px-8 py-4">
                <button
                  onClick={() => deleteUserHandle(data.id)}
                  className="text-xl text-red-500">
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
