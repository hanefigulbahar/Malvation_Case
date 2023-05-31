import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { request } from "../service/request";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUser } from "../features/selecredUserSlice";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  role: string;
  active: boolean;
};

const UserDetail = () => {
  const dispatch = useAppDispatch();
  const authUserToken = useAppSelector((state) => state.autUser.accessToken);

  const selectedUser = useAppSelector((state) => state.selectedUser.user);
  const location = useLocation();
  const { register, handleSubmit } = useForm<Inputs>();

  const selectedUserFetch = async () => {
    const selectedData = await request(
      `http://localhost:3000${location.pathname}`,
      "GET"
    );
    dispatch(updateUser(selectedData));
  };

  console.log(window.history);

  useEffect(() => {
    selectedUserFetch();
    return () => {
      dispatch(updateUser(null));
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await request(`http://localhost:3000${location.pathname}`, "PATCH", {
      firstName: data.firstName ? data.firstName : selectedUser?.firstName,
      lastName: data.lastName ? data.lastName : selectedUser?.lastName,
      email: data.email ? data.email : selectedUser?.email,
      phone: data.phone ? data.phone : selectedUser?.phone,
      role: data.role ? data.role : selectedUser?.role,
      active: data.active ? data.active : selectedUser?.active,
    });
    selectedUserFetch();
  };

  return (
    <>
      {authUserToken ? (
        <form className="w-full p-10 " onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-6 group ">
            <input
              defaultValue={selectedUser?.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={selectedUser?.firstName}
                type="text"
                id="first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("firstName")}
              />
              <label
                htmlFor="first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("lastName")}
                defaultValue={selectedUser?.lastName}
                type="text"
                id="last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={selectedUser?.phone}
              type="phone"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <select
                {...register("role")}
                id="select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option disabled selected>
                  Select role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-center items-center gap-3 z-0 w-full mb-6 group">
              <label
                className="relative inline-flex items-center  dark:text-white"
                htmlFor="">
                Active
              </label>
              <label className="relative inline-flex items-centercursor-pointer">
                <input
                  defaultChecked={selectedUser?.active}
                  {...register("active")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default UserDetail;
