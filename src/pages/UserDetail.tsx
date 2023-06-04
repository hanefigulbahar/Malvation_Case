import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { request } from "../service/request";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUser } from "../features/selecredUserSlice";
import { isLoading } from "../features/loadingSlice";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import { User } from "../types/users";

type Inputs = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  role: string | null;
  active: boolean | null;
};

const UserDetail = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const authUserToken = useAppSelector((state) => state.autUser.accessToken);
  const selectedUser = useAppSelector((state) => state.selectedUser.user);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const { register, handleSubmit } = useForm<Inputs>();

  const selectedUserFetch = async () => {
    const selectedData: User = await request(
      `http://localhost:3000${location.pathname}`,
      "GET"
    );
    dispatch(updateUser(selectedData));
    dispatch(isLoading(false));
  };
  useEffect(() => {
    dispatch(isLoading(true));
    selectedUserFetch();

    return () => {
      dispatch(updateUser(null));
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateUserStatus = await request(
      `http://localhost:3000${location.pathname}`,
      "PATCH",
      {
        active: data.active,
        firstName: data.firstName ? data.firstName : selectedUser?.firstName,
        lastName: data.lastName ? data.lastName : selectedUser?.lastName,
        email: data.email ? data.email : selectedUser?.email,
        phone: data.phone ? data.phone : selectedUser?.phone,
        role: data.role ? data.role : selectedUser?.role,
      }
    );
    if (updateUserStatus === 200) {
      toast.success("Updated successfully");
    } else {
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      {authUserToken ? (
        <>
          {loading ? (
            <div className="w-full h-screen p-4">
              <Loading />
            </div>
          ) : (
            <form className="w-full p-10 " onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 w-full mb-6 group ">
                <input
                  {...register("email")}
                  placeholder={selectedUser?.email}
                  type="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                />
                <label
                  htmlFor="email"
                  className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                  Email address
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    {...register("firstName")}
                    placeholder={selectedUser?.firstName}
                    type="text"
                    id="first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  />
                  <label
                    htmlFor="first_name"
                    className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    {...register("lastName")}
                    placeholder={selectedUser?.lastName}
                    type="text"
                    id="last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  />
                  <label
                    htmlFor="last_name"
                    className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                    Last name
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("phone")}
                  placeholder={selectedUser?.phone}
                  type="phone"
                  name="phone"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                />
                <label
                  htmlFor="email"
                  className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                  Phone number
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    {...register("role")}
                    id="select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex justify-center items-center gap-3 z-0 w-full mb-6 group">
                  <label
                    className="relative inline-flex items-center text-gray-500 dark:text-gray-50"
                    htmlFor="">
                    Active
                  </label>
                  <label className="relative inline-flex items-centercursor-pointer">
                    <input
                      placeholder="Active"
                      {...register("active")}
                      defaultChecked={selectedUser?.active}
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                Submit
              </button>
            </form>
          )}
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default UserDetail;
