import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { request } from "../service/request";
import { loginUser } from "../features/autUserSlice";

interface ILogin {
  accessToken: string;
  user: {
    email: string;
    password: string;
  };
}

type Inputs = {
  email: string;
  password: string;
};

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
      toast.success("Successfully logged in");
      dispatch(loginUser(login));
      navigate("/");
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        className="border border-red-500 w-1/3 h-1/3 m-auto flex flex-col justify-center items-center gap-10 "
        onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};
