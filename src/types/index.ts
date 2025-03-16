export type TUser = {
  handle: string;
  name: string;
  email: string;
};

export type RegisterForm = Pick<TUser, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};
