import * as Yup from "yup";

export const userUpdateSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^\S*$/, "Email cannot be ignored and no space can be left"),
  firstName: Yup.string()
    .max(10)
    .matches(/^.+$/, "First name cannot be ignored and no space can be left"),

  lastName: Yup.string()
    .max(20)
    .matches(/^.+$/, "Last name cannot be ignored and no space can be left"),

  phone: Yup.string()
    .max(20, "max 20 number")
    .matches(
      /\+\d{2} \d{3} \d{3} \d{4}$/,
      "Invalid phone number format. It should be '+11 222 333 4444'"
    ),
  role: Yup.string(),
  active: Yup.boolean(),
}).required();
