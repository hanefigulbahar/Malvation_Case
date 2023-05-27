import { useAppSelector } from "../store/hooks";

const UserList = () => {
  const allUsers = useAppSelector((state) => state.allData.data?.users);
  console.log(allUsers);
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Year</th>
        </tr>
      </thead>
      {allUsers?.map((data) => (
        <tbody>
          <tr>
            <td>{data.email}</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default UserList;
