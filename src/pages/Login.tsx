import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { request } from "../service/request";
import { loginUser } from "../features/autUserSlice";
import { useEffect } from "react";
import { themeChanger } from "../utils/themaChanger";

interface ILogin {
  accessToken: string;
  user: {
    email: string;
    password: string;
  };
}

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const login: ILogin = await request("http://localhost:3000/login", "POST", {
      email: data.email,
      password: data.password,
    });
    if (!login.accessToken) {
      toast.error("An error occurred during the login process!");
    } else {
      dispatch(loginUser(login));
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-gray-300">
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <input
              placeholder="example@mail.com"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-600  focus:border-sky-900 block w-full p-2.5 dark:focus:outline-sky-700 dark:focus:border-sky-800  dark:text-gray-500 dark:border-gray-400 "
            />
          </div>
          {errors.email && <span>This field is required</span>}
          <div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-600  focus:border-sky-900 block w-full p-2.5 dark:focus:outline-sky-700 dark:focus:border-sky-800  dark:text-gray-500 dark:border-gray-400 "
            />
          </div>
          {errors.password && <span>This field is required</span>}
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
