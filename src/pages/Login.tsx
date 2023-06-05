import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { request } from "../service/request";
import { loginUser } from "../features/autUserSlice";
import { useEffect } from "react";
import { themeChanger } from "../utils/themaChanger";
import { AuthUser } from "../types/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import { updatePage } from "../features/paginationSlice";

type FormData = Yup.InferType<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pagination.page);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const login: AuthUser = await request(
      "http://localhost:3000/login",
      "POST",
      {
        email: data.email,
        password: data.password,
      }
    );
    if (!login.accessToken) {
      toast.error("An error occurred during the login process!");
    } else {
      dispatch(
        loginUser({
          accessToken: login.accessToken,
          user: login.user,
        })
      );
      dispatch(updatePage(page));
      navigate("/");
    }
  };

  useEffect(() => {
    themeChanger();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50 dark:bg-gray-400">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-gray-300">
            Sign in to our platform
          </h5>
          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <input
              placeholder="example@mail.com"
              {...register("email", { required: true })}
              className={
                errors.email
                  ? "border border-rose-500 outline-rose-500 bg-rose-100 placeholder:text-rose-700 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-600  focus:border-sky-900 block w-full p-2.5 dark:focus:outline-sky-700 dark:focus:border-sky-800  dark:text-gray-500 dark:border-gray-400 "
              }
            />
            <span className="absolute left-2 text-xs text-red-500 dark:text-rose-400">
              {errors.email?.message}
            </span>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Your password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={
                errors.password
                  ? "border border-rose-500 outline-rose-500 bg-rose-100 placeholder:text-rose-700 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-600  focus:border-sky-900 block w-full p-2.5 dark:focus:outline-sky-700 dark:focus:border-sky-800  dark:text-gray-500 dark:border-gray-400 "
              }
            />
            <span className="absolute left-2 text-xs text-rose-500 dark:text-rose-400">
              {errors.password?.message}
            </span>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded accent-sky-600 bg-white"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300 ">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-sky-600 dark:text-gray-400 hover:underline">
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500">
            Not registered?{" "}
            <a href="#" className="text-sky-600 hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
