export type TUser = {
  handle: string;
  name: string;
  email: string;
};

export type RegisterForm = Pick<TUser, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<TUser, "email"> & {
  password: string;
};
