import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { allData } from "../features/usersSlice";
import { toast } from "react-hot-toast";

const UserList = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.allData.users);

  const fetchData = async () => {
    const users = await request("http://localhost:3000/users", "GET");
    dispatch(allData(users));
  };

  const deleteUserHandle = async (id: number) => {
    const deleteStatus = await request(
      `http://localhost:3000/users/${id}`,
      "DELETE"
    );
    deleteStatus === 200
      ? toast.success("Deletion successful")
      : toast.error("Deletion failed");
    fetchData();
  };

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((data) => (
            <tr key={data.id}>
              <a href={"users/" + data.id.toLocaleString()}>
                <td>
                  {data.firstName} {data.lastName}
                </td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.role}</td>
                {data.isActive ? <td>Yes</td> : <td>No</td>}
              </a>
              <td>
                <button
                  onClick={() => deleteUserHandle(data.id)}
                  className="border border-red-500">
                  sil
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
