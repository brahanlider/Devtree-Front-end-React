export type TUser = {
  handle: string;
  name: string;
  email: string;
  __id: string;
  description: string;
  image: string;
  links: string;
};

export type UserHandle = Pick<
  TUser,
  "description" | "handle" | "image" | "links" | "name"
>;

export type RegisterForm = Pick<TUser, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<TUser, "email"> & {
  password: string;
};

export type ProfileForm = Pick<TUser, "handle" | "description">;

export type TSocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type TDevTreeLink = Pick<TSocialNetwork, "name" | "url" | "enabled">;
