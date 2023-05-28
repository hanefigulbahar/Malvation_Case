import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  useEffect(() => {
    selectedUserFetch();
  }, []);
  console.log(selectedUser?.role);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder={selectedUser?.firstName} {...register("firstName")} />
      <input placeholder={selectedUser?.lastName} {...register("lastName")} />

      <input
        placeholder={selectedUser?.email}
        type="email"
        {...register("email")}
      />

      <input
        placeholder={selectedUser?.phone}
        type="tel"
        {...register("phone")}
      />

      <select defaultValue={selectedUser?.role} {...register("role")}>
        <option value="" disabled selected>
          Select your option
        </option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          defaultChecked={selectedUser?.active}
          {...register("active")}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

      <input type="submit" value={"Update user"} />
    </form>
  );
};

export default UserDetail;
