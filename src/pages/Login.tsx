import { useForm, SubmitHandler } from "react-hook-form";
import { request } from "../service/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { allData } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/autUserSlice";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allUsers = useAppSelector((state) => state.allData.users);
  const autUser = useAppSelector((state) => state.autUser.user);
  const autUserStatus = useAppSelector((state) => state.autUser.isAut);
  console.log(autUser, autUserStatus);
  console.log(allUsers);
  useEffect(() => {
    const fetchData = async () => {
      const users = await request("http://localhost:3000/users", "GET");
      dispatch(allData(users));
    };
    fetchData();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (
      allUsers?.find((res) => res.email === data.email) &&
      allUsers?.find((res) => res.password === data.password)
    ) {
      window.localStorage.setItem("user", JSON.stringify(data));
      window.localStorage.setItem("status", JSON.stringify(true));
      dispatch(loginUser(data));
      await toast.promise(
        new Promise((resolve) => {
          // authentication process sumilations
          setTimeout(() => {
            resolve("Successfully logged in");
          }, 2000);
        }),
        {
          loading: "Logon process in progress",
          success: (result: unknown) => `Welcome: ${result}`,
          error: "An error occurred during the login process!",
        }
      );
      navigate("/");
    } else {
      toast.error("Email or password is not valid");
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="example@mail.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <input
          placeholder="******"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </>
  );
};
