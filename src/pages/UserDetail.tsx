import * as Yup from "yup";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { request } from "../service/request";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUser } from "../features/selecredUserSlice";
import { isLoading } from "../features/loadingSlice";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import { User } from "../types/users";
import { userUpdateSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorPage from "./Error";

type FormData = Yup.InferType<typeof userUpdateSchema>;

const UserDetail = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const authUserToken = useAppSelector((state) => state.autUser.accessToken);
  const selectedUser = useAppSelector((state) => state.selectedUser.user);
  const loading = useAppSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(isLoading(true));
    selectedUserFetch();
    dispatch(isLoading(false));

    return () => {
      dispatch(updateUser(null));
    };
  }, []);
  const selectedUserFetch = async () => {
    const selectedData: User = await request(
      `http://localhost:3000${location.pathname}`,
      "GET"
    );
    if (selectedData.id !== undefined) {
      dispatch(updateUser(selectedData));
    } else {
      navigate("/error");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userUpdateSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const updateUserStatus = await request(
      `http://localhost:3000${location.pathname}`,
      "PATCH",
      {
        active: data.active,
        firstName: data.firstName ? data.firstName : selectedUser?.firstName,
        lastName: data.lastName ? data.lastName : selectedUser?.lastName,
        email: data.email ? data.email : selectedUser?.email,
        phone: data.phone ? data.phone : selectedUser?.phone,
        role: data.role,
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
            <form className="w-full p-10  " onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 w-full mb-10 group ">
                <input
                  {...register("email")}
                  defaultValue={selectedUser?.email}
                  id="email"
                  className={
                    errors.email
                      ? "block py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-rose-400 appearance-none dark:text-white dark:border-rose-600 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-rose-600 peer"
                      : "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  }
                />
                <label
                  htmlFor="email"
                  className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                  Email address
                </label>
                <span className="absolute left-0 text-xs text-red-500 dark:text-rose-400">
                  {errors.email?.message}
                </span>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-10 group">
                  <input
                    {...register("firstName")}
                    defaultValue={selectedUser?.firstName}
                    id="first_name"
                    className={
                      errors.firstName
                        ? "block py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-rose-400 appearance-none dark:text-white dark:border-rose-600 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-rose-600 peer"
                        : "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                    }
                  />
                  <label
                    htmlFor="first_name"
                    className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                    First name
                  </label>
                  <span className="absolute left-0 text-xs text-red-500 dark:text-rose-400">
                    {errors.firstName?.message}
                  </span>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                  <input
                    {...register("lastName")}
                    defaultValue={selectedUser?.lastName}
                    id="last_name"
                    className={
                      errors.lastName
                        ? "block py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-rose-400 appearance-none dark:text-white dark:border-rose-600 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-rose-600 peer"
                        : "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                    }
                  />
                  <label
                    htmlFor="last_name"
                    className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                    Last name
                  </label>
                  <span className="absolute left-0 text-xs text-red-500 dark:text-rose-400">
                    {errors.lastName?.message}
                  </span>
                </div>
              </div>
              <div className="relative z-0 w-full mb-10 group">
                <input
                  {...register("phone")}
                  defaultValue={selectedUser?.phone}
                  id="phone"
                  className={
                    errors.phone
                      ? "block py-2.5 px-0 w-full text-sm text-red-500 bg-transparent border-0 border-b-2 border-rose-400 appearance-none dark:text-white dark:border-rose-600 dark:focus:border-rose-500 focus:outline-none focus:ring-0 focus:border-rose-600 peer"
                      : "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                  }
                />
                <label
                  htmlFor="phone"
                  className="font-medium absolute text-sm  dark:text-gray-400 duration-300 transform top-3 -z-10 origin-[0] text-sky-600 peer:dark:text-sky-500 scale-100 -translate-y-6">
                  Phone number
                </label>
                <span className="absolute left-0 text-xs text-red-500 dark:text-rose-400">
                  {errors.phone?.message}
                </span>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-10 group">
                  <select
                    {...register("role")}
                    defaultValue={selectedUser?.role}
                    id="select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="flex justify-end items-center gap-3 z-0 w-full mb-6 group md:justify-center">
                  <label className="relative inline-flex items-center text-gray-500 dark:text-gray-50">
                    Active
                  </label>
                  <label className="relative inline-flex items-centercursor-pointer">
                    <input
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
